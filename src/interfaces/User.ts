export default interface User {

    _id: string,
    givenName: string,
    middleName: string,
    lastName: string,
    username: string,
    password: string,
    profileImage: string,
    friends: Array<User>
}