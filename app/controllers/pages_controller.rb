class PagesController < ApplicationController
  def home
    @popularIssues = Category::POPULAR
  end
end
