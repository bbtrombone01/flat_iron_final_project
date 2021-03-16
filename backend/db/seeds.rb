# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(username: "steven", password: "chase")
User.create(username: "test", password: 'testing')
User.create(username: "phill", password: "realdude")


Character.create(name: " i am the first dude", description: "first", user_id: 1)
Character.create(name: " i am the second dude", description: "wants to be first", user_id:1)
Character.create(name: " i am the final dude,", description: "countdown", user_id: 1)

Character.create(name: " i belong to user 2", description: "first second", user_id: 2)
Character.create(name: "i also belong to user 2", description: " just second", user_id: 2)
Character.create(name: " i am a rebel", description: "final", user_id: 2)

Character.create(name: " i am users three", description: "final first", user_id: 3)
Character.create(name: " second third", description: " final second ", user_id: 3)
Character.create(name: "ted cruz", description: " i am terriabel", user_id:3 )
