import { useState } from 'react'

const Authentification = () => {
    const [phone, setPhone] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Numéro saisi :', phone)
    }

    return (
        <div className="container mt-5">
            <h1>Enter your mobile number</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">phone number</label>
                    <input
                        type="tel"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="ex: 77 123 45 67"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Valider
                </button>
            </form>
        </div>
    )
}

export default Authentification
