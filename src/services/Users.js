export const loginUser = (username, password) => {
    if (username === 'andry05') {
        if (password === '1234') {
            return ({
                validate: true
            })
        } else {
            return ({
                validate: false
            })
        }
    } else {
        return ({
            validate: false
        })
    }
}