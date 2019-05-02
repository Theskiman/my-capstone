const apiURL = "http://localhost:5002"

export default {
    postReview(newReview) {
        return fetch(`${apiURL}/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newReview)
        }).then(review => review.json())
    },

    getReview(id) {
        return fetch(`${apiURL}/reviews/${id}`)
        .then(review => review.json())
    }
}