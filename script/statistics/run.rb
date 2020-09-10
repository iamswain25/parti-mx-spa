require 'graphlient'
require 'dotenv/load'
require 'csv'

client = Graphlient::Client.new(ENV['ADMIN_URL'],
                                headers: {
                                  'x-hasura-admin-secret' => ENV['ADMIN_PASSWORD']
                                },
                                http_options: {
                                  read_timeout: 20,
                                  write_timeout: 30
                                })

mx_groups = client.query <<~GRAPHQL
  query {
    mx_groups {
      id
      title
      boards {
        id
        title
        type
      }
    }
  }
GRAPHQL

file = "data-#{Time.now.strftime('%Y-%m-%d_%H%M%S')}.csv"
headers = %w[그룹# 그룹 게시판# 게시판이름 회원# 이름 이메일 게시글수 댓글수 공감수]

CSV.open(file, 'w', write_headers: true, headers: headers) do |writer|
  mx_groups.data.mx_groups.each do |group|
    puts group.id
    puts group.title
    puts '-----------------'

    group.boards.each do |board|
      puts " > #{board.id}"
      puts " > #{board.title}"

      mx_users = client.query <<~GRAPHQL
        query{
          mx_users {
            id
            email
            name
            status: groups(where:{group_id:{_eq: 1}}){
              status
            }
            comments_aggregate(where:{
                post:{
                  board:{
                    group_id:{ _eq: #{group.id} }
                    id: {_eq: #{board.id}}
                  }
                }
              }) {
              aggregate {
                count
              }
            }
            createdPosts_aggregate(where:{
              board:{
                group_id:{ _eq: #{group.id} }
                id:{ _eq: #{board.id} }
              }
            }) {
              aggregate {
                count
              }
            }
            checkedPosts_aggregate(where:{
              post:{
                board:{
                  group_id:{ _eq: #{group.id} }
                  id:{ _eq: #{board.id} }
                }
              }
            }) {
              aggregate {
                sum {
                  like_count
                }
              }
            }
          }
        }
      GRAPHQL

      mx_users.data.mx_users.each do |user|
        writer << [group.id, group.title, board.id, board.title, user.id, user.name, user.email,
                   (user.created_posts_aggregate.aggregate.count || 0),
                   (user.comments_aggregate.aggregate.count || 0),
                   (user.checked_posts_aggregate.aggregate.sum.like_count || 0)]
      end
    end
  end
end
