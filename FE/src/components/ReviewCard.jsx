export default function ReviewCard({ reviews }) {

    const { first_name, last_name, vote, email, review } = reviews

    return (
        <div>
            <h3>{first_name} {last_name}</h3>
            <p>{vote}</p>
            <p>{email}</p>
            <p>{review}</p>
        </div>
    )
}