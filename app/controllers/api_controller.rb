class ApiController < ApplicationController
  
  def index
    categories = params[:categories].split(',')
    categories.map!(&:to_i)

    candidate1 = Candidate.find_by(refid: params[:candidate1].to_i)
    candidate2 = Candidate.find_by(refid: params[:candidate2].to_i)

    # joining vote and bill tables per candidate
    a_votes = candidateVotes(candidate1)
    b_votes = candidateVotes(candidate2)
    
    a_votes = a_votes.sort_by{ |bill| bill.category_name}.group_by{ |bill| bill.category_name }
    b_votes = b_votes.sort_by{ |bill| bill.category_name}.group_by{ |bill| bill.category_name }\

    # check if missing any categories, if so create it with an empty array.
    handleAbsentCategories(categories, a_votes, b_votes)

    @votes = [a_votes, b_votes]
  
    render json: {votes: @votes}
  end

  private

  def candidateVotes(candidate)
    candidate.bills.left_joins(:votes, :categories)
      .select(
        :refid, 
        'bills.title as bill_name', 
        :outcome_date, 
        :outcome, 
        :url, 
        :synopsis, 
        :level,
        'votes.like as candidate_vote', 
        'categories.name as category_name'
      )
  end

  def handleAbsentCategories(categories, a_votes, b_votes)
    categories.each do |category_refid|
      category_name = Category.find_by(refid: category_refid).name
      
      if a_votes.key?(category_name) == false
        a_votes[category_name] = []
      end

      if b_votes.key?(category_name) == false
        b_votes[category_name] = []
      end
    end
  end 

end
