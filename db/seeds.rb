require 'httparty'

Profile.create(
  first_name: "Tester", 
  last_name: "McTester",
  email: "user@email.com",
  password_digest: "password"
)

def votesmartAPI(methodName, params) 
  key = ENV['API_KEY']
  params_str = params.join("&")
  HTTParty.get("http://api.votesmart.org/#{methodName}?key=#{key}&#{params_str}")
end

def getPresidentialCandidates 
  @presCandidates = []
  candidateList = ["Michael Bennet", "Joe Biden", "Bill de Blasio", "Cory Booker", "Steve Bullock",
                   "Pete Buttigieg", "Julián Castro", "John Delaney", "Tulsi Gabbard", "Kirsten Gillibrand",
                   "Mike Gravel", "Kamala Harris", "John Hickenlooper", "Jay Inslee", "Amy Klobuchar",
                   "Wayne Messam", "Seth Moulton", "Beto O'Rourke", "Tim Ryan", "Bernie Sanders", "Joe Sestak",
                   "Tom Steyer", "Elizabeth Warren", "Marianne Williamson", "Andrew Yang", "Donald Trump",
                   "Bill Weld"]

  candidateList.each do |name|
    @presCandidates.push votesmartAPI("Candidates.getByLevenshtein", ["lastName=#{name.split(' ').last}, 2020"])["candidateList"]["candidate"]
  end
  @presCandidates.flatten!(1).select!{ |c| c["electionStatus"] == "Announced" }
  @presCandidates.each do |pres|
    pp pres["ballotName"]
    pp pres["candidateId"]

    Candidate.find_or_create_by(refid: pres["candidateId"])  do |data|
      data.ballot_name = pres["ballotName"]
      data.election_office = pres["electionOffice"]
      data.party = pres["electionParties"]
      data.status = pres["electionStatus"]
      data.current_office = pres["officeName"] || ''
      puts "#{pres["ballotName"]} created"
    end
       
  end
end
getPresidentialCandidates 
