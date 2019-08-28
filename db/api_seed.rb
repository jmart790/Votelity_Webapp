require 'httparty'
p '😈 --hello world-- 😈'

def votesmartAPI(methodName, params) 
  key = ENV['API_KEY']
  params_str = params.join("&")
  HTTParty.get("http://api.votesmart.org/#{methodName}?key=#{key}&#{params_str}")
end

def handleBillDetails(bill, action, actionDetails)
  puts "3️⃣❗️ --handleBillDetails--  ❗️3️⃣"
  other_option = {"category" => {"name" => "Other", "categoryId" => 999}}
  pp bill
  # puts "⚠️  ⚠️  ⚠️   BILL"
  fixed_categories = Hash.new
  if bill.key?("categories") == false
    fixed_categories = {"category"=>{"categoryId"=>bill["categoryId"], "name"=>bill["category"]}}
  elsif bill["categories"].nil? == false
    fixed_categories = bill["categories"]
  else
    fixed_categories = other_option
  end
  pp fixed_categories

  billDetails = {
    "title" => bill["title"] || billDetails["billNumber"],
    "url" => bill["billtextLink"],
    "categories" => fixed_categories,
    "outcome" => actionDetails["outcome"],
    "level" => action["level"],
    "date" => action["statusDate"],
    "synopsis" => actionDetails["synopsis"]
    }
end

def getBillDetails(billId)
  puts "2️⃣🔸 --getBillDetails--  🔸2️⃣"
  bill = votesmartAPI("Votes.getBill", ["billId=#{billId}"])["bill"]
  action = bill["actions"]["action"] 
  
  if action.kind_of?(Hash)   # ignores bills that have not been voted on or have an outcome
    if action.select { |a| a["outcome"] || a["rollNumber"]}
       actionDetails = votesmartAPI("Votes.getBillAction", ["actionId=#{action["actionId"]}"])["action"]
      handleBillDetails(bill, action, actionDetails)
    end
  else 
    action = action.select { |a| a["outcome"] || a["rollNumber"]}.first
    actionDetails = votesmartAPI("Votes.getBillAction", ["actionId=#{action["actionId"]}"])["action"]
    actionDetails
    handleBillDetails(bill, action, actionDetails)
  end
end


def findsNilCategories(bill)
  puts "4️⃣🔹 --findNillCateogories--  🔹4️⃣"
  pp bill
  isNil = false
  if  bill.key?("categories") && bill["categories"].nil?
    isNil = true 
    if bill["categories"].key?("category") && bill["categories"]["category"].nil?
      isNil = true
      if bill["categories"]["category"].key?("categoryId") && bill["categories"]["category"]["categoryId"].nil?
        isNil = true
      end
    end
  elsif bill.key?("category") && bill["category"].nil? 
    isNil = true
  elsif bill.key?("categoryId") && bill["categoryId"].nil? 
    isNil = true
  else
    isNil = false
  end
  isNil
end

def createBill(billId, billInfo)
  Bill.find_or_create_by(refid: billId)  do |data|
    data.title = billInfo["title"]
    data.url = billInfo["url"]
    data.outcome = billInfo["outcome"]
    data.level = billInfo["level"]
    data.outcome_date = billInfo["date"]
    data.synopsis = billInfo["synopsis"]
  end
end

def getCandidateVotes(canId)     
  puts "1️⃣✅ -- getCandidateVotes -- ✅1️⃣"    
  canVotes = votesmartAPI("Votes.getByOfficial", ["candidateId=#{canId}"])
  if canVotes.key?("bills")
    canVotes = canVotes["bills"]["bill"]
    if canVotes.kind_of?(Array)
      canVotes.each do |vote| 
        b = vote["billId"].to_i
        v = vote["vote"] == '-' ? 'D' : vote["vote"]
        bill = getBillDetails(b)

        if findsNilCategories(bill) == true
          puts "cat is nil!!!! ⚠️⚠️⚠️"
          # if other category does not exist create it
          new_category = Category.find_or_create_by(refid: 999)
          new_category.name = "Other" 
          new_category.save

          newBill = createBill(b, bill)
          new_category.bills << newBill

          vote_bill = Bill.find_by(refid: b)
          vote_candidate = Candidate.find_by(refid: canId.to_i)
          new_vote = Vote.find_or_create_by(candidate_id: vote_candidate.id, bill_id: vote_bill.id)
          new_vote.like = v
          new_vote.save
        else
          cat = bill["categories"]["category"]
          new_category = Category.find_or_create_by(refid: cat["categoryId"].to_i)
          new_category.name = cat["name"] 
          new_category.save

          newBill = createBill(b, bill)
          new_category.bills << newBill
    
          vote_bill = Bill.find_by(refid: b)
          vote_candidate = Candidate.find_by(refid: canId.to_i)
          new_vote = Vote.find_or_create_by(candidate_id: vote_candidate.id, bill_id: vote_bill.id)
          # p new_vote
          # p 'ERRORS? AGAIN'
          # p new_vote.errors
          new_vote.like = v
          new_vote.save

        end
      end
    end
  end
end

# Candidate.all.each do |can|
#   getCandidateVotes(can.refid)
# end

# getCandidateVotes(129306)     # tulsi
# getCandidateVotes(110942)     # bennet
# getCandidateVotes(53279)      # Biden
# getCandidateVotes(80257)      # De blasio                     votesmart has no votes
# getCandidateVotes(76151)      # Booker
# getCandidateVotes(110899)     # Steve Bullock
# getCandidateVotes(127151)     # pete butti                    votesmart has no votes
# getCandidateVotes(115371)     # julian castro                 votesmart has no votes
# getCandidateVotes(135143)     # john delani
# getCandidateVotes(65147)      # kristen gillabrand
# getCandidateVotes(120012)     # kamala harris
# getCandidateVotes(71547)      # hickenlooper                  dropped out-removed
# getCandidateVotes(27125)      # jay inslee
# getCandidateVotes(65092)      # Amy Klobuchar
# getCandidateVotes(130228)     # Wayne Messam                  votesmart has no votes
# getCandidateVotes(146299)     # Seth Moulton
# getCandidateVotes(78533)      # Beto o rourke                   ...
# getCandidateVotes(45638)      # Timothy J. 'Tim' Ryan         
# getCandidateVotes(140374)     # Robert William Sandera        votesmart has no votes
# getCandidateVotes(27110)      # Bernard 'Bernie' Sanders
# getCandidateVotes(58333)      # Joseph A. 'Joe' Sestak
# getCandidateVotes(186788)     # Tom Steyer                    votesmart has no votes
getCandidateVotes(141272)     # Elizabeth Warren 
# getCandidateVotes(146092)     # Marianne Williamson           votesmart has no votes
# getCandidateVotes(186040)     # Andrew Yang                   votesmart has no votes
getCandidateVotes(15723)      # Donald J. Trump 
# getCandidateVotes(21733)      # William F. 'Bill' Weld        votesmart has no votes