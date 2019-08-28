class ApiController < ApplicationController
  
  def index
    categories = params[:categories].split(',')
    categories.map!(&:to_i)

    candidate1 = Candidate.find_by(refid: params[:candidate1].to_i)
    candidate2 = Candidate.find_by(refid: params[:candidate2].to_i)
    # joining vote and bill tables per candidate
    a_votes = candidate1.bills.left_joins(:votes, :categories).select(:refid, 'bills.title as bill_name', :outcome_date, :outcome, :url, :synopsis, :level,'votes.like as candidate_vote', 'categories.name as category_name')
    b_votes = candidate2.bills.left_joins(:votes, :categories).select(:refid, 'bills.title as bill_name', :outcome_date, :outcome, :url, :synopsis, :level,'votes.like as candidate_vote', 'categories.name as category_name')
    
    a_votes = a_votes.sort_by{ |bill| bill.category_name}.group_by{ |bill| bill.category_name }
    b_votes = b_votes.sort_by{ |bill| bill.category_name}.group_by{ |bill| bill.category_name }

   
    # uniq_votes_b = b_votes.each{|category| category.uniq{ |bill| bill.bill_name}}
    # byebug

    @votes = [a_votes, b_votes]
  
    render json: {votes: @votes}
  end

end
