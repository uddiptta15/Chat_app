const getSender = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].username : users[0].username;
};
const getShortName = (name) => {
    if (name != null && name.length > 15) {
        return name.substring(0, 15) + "...";
    }
    return name;
}

export default getSender;
export { getShortName };