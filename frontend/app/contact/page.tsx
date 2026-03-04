export default function ContactPage() {
    return (
        <div className="container py-5">
            <h1 className="text-warning fw-bold mb-4">Contact Us</h1>
            <p className="fs-5 text-light mb-4">
                Have questions about a deal? Want to feature your product? Reach out to us below!
            </p>
            <div className="card p-4 mx-auto shadow-sm" style={{ maxWidth: "600px" }}>
                <form>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="name">Your Name</label>
                        <input type="text" className="form-control" id="name" placeholder="John Doe" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <input type="email" className="form-control" id="email" placeholder="john@example.com" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="message">Message</label>
                        <textarea className="form-control" id="message" rows={5} placeholder="How can we help?"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 fw-bold">Send Message</button>
                </form>
            </div>
        </div>
    );
}
