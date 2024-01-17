const { totalLikes, favoriteBlog, mostBlogs, mostLikes } = require( '../utils/list_helper' )
const _ = require( 'lodash' )

describe( 'total likes', () =>
{
    test( 'of multiple blogs', () =>
    {
        const blogs = [
            { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 },
            { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 },
            { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 },
            { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 },
            { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 },
            { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
        ]

        const result = totalLikes( blogs )
        expect( result ).toBe( 36 )
    } )

    test( 'when list has only one blog, equals the likes of that', () =>
    {
        const listWithOneBlog = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            }
        ]

        const result = totalLikes( listWithOneBlog )
        expect( result ).toBe( 5 )
    } )

} )

describe( 'favorite blog', () =>
{
    test( 'returns the favorite blog when there is one', () =>
    {
        const blogs = [
            { title: "Blog 1", author: "Author 1", likes: 10 },
            { title: "Blog 2", author: "Author 2", likes: 15 },
            { title: "Blog 3", author: "Author 3", likes: 12 }
        ]

        const result = favoriteBlog( blogs )

        expect( result ).toEqual( { title: "Blog 2", author: "Author 2", likes: 15 } )
    } )

    test( 'returns "No blogs available" when the list is empty', () =>
    {
        const blogs = []

        const result = favoriteBlog( blogs )

        expect( result ).toBe( "No blogs available" )
    } )

    test( 'returns the only blog when there is only one blog', () =>
    {
        const blogs = [
            { title: "Solo Blog", author: "Solo Author", likes: 20 }
        ]

        const result = favoriteBlog( blogs )

        expect( result ).toEqual( { title: "Solo Blog", author: "Solo Author", likes: 20 } )
    } )

} )

describe( 'author with most blogs', () =>
{
    test( 'returns the author with the most blogs and the number of blogs', () =>
    {
        const blogs = [
            { title: "Blog 1", author: "Author 1" },
            { title: "Blog 3", author: "Author 1" },
            { title: "Blog 4", author: "Author 3" },
            { title: "Blog 2", author: "Author 2" },
            { title: "Blog 5", author: "Author 2" },
            { title: "Blog 6", author: "Author 2" }
        ]

        const result = mostBlogs( blogs )

        expect( result ).toEqual( {
            author: "Author 2",
            blogs: 3
        } )
    } )

    test( 'handles an empty array of blogs', () =>
    {
        const blogs = []

        const result = mostBlogs( blogs )

        expect( result ).toBe( "No blogs available" )
    } )

} )

describe( 'author with most likes', () =>
{
    test( 'returns the author with the most likes and the total number of likes', () =>
    {
        const blogs = [
            { title: "Blog 1", author: "Author 1", likes: 10 },
            { title: "Blog 3", author: "Author 1", likes: 5 },
            { title: "Blog 4", author: "Author 3", likes: 8 },
            { title: "Blog 2", author: "Author 2", likes: 15 },
            { title: "Blog 5", author: "Author 2", likes: 12 },
            { title: "Blog 6", author: "Author 2", likes: 7 }
        ]

        const result = mostLikes( blogs )

        const expectedAuthor = "Author 2"
        const expectedLikes = 34

        expect( result ).toEqual( {
            author: expectedAuthor,
            likes: expectedLikes
        } )
    } )

    test( 'handles an empty array of blogs', () =>
    {
        const blogs = []

        const result = mostLikes( blogs )

        expect( result ).toBe( "No blogs available" )
    } )

} )