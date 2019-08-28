# Final Project

## Wireframes

![Home](readme_assets/Home.jpg)
![All wireframes](https://user-images.githubusercontent.com/25231189/62399826-1f12a100-b54b-11e9-96d1-66915c6de002.png)

## ERD

![ERD](readme_assets/erd_model.png)

## Deployment

If your project uses the `react_on_rails` gem, you will need to:

* `heroku create your-app-name`
* `heroku buildpacks:set --index 1 heroku/nodejs`
* `heroku buildpacks:add heroku/ruby`
* `git push heroku master`
* `heroku run rails db:migrate`
* optional: `heroku run rails db:seed`

# Votelity_Webapp
