require "rails_helper"

feature "user group movies" do
  let!(:user) { User.create(uid: "123",
                            username: "Jack Nicholson",
                            email: "crazyman@email.com")
                            }

  let(:movie)          { Movie.create(title: "Avatar",
                                       imdb_id: "12")
                                      }

  let!(:user_watchlist) { UserWatchlist.create(user_id: user.id,
                                               movie_id: movie.id)
                                               }

  let!(:group) { Group.create(name: "The House of Cards",
                              description: "shaky foundation")
                              }

  let!(:user_group) { UserGroup.create(user_id: user.id,
                                       group_id: group.id,
                                       active: true)
                                       }

  let(:group_watchlist_movie) { GroupWatchlist.create(group_id: group.id,
                                                 movie_id: movie.id)
                                                 }
  it "user remove flick" do
    allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)

    visit group_path(group.id)

    expect(page).to have_content(movie.title)

    page.check('group[movie_ids][]')
    click_button "Add Vote List"

    click_link "remove"

    expect(page).to have_content("Flick Removed From Watchlist")

  end
end
