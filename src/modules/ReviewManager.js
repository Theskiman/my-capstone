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

    getAllReviews() {
        return fetch(`${apiURL}/reviews/?_expand=book`)
            .then(reviews => reviews.json())
    },

    editReview(editedReview) {
        return fetch(`${apiURL}/reviews/${editedReview.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedReview)
        })
    },

    deleteReview(id) {
        return fetch(`${apiURL}/reviews/${id}`, {
            method: "DELETE"
        })


    }
}