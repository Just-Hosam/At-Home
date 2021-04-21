import React from 'react';

export default function ContactUs() {
	return (
		<div id="contact-page">
			<header>
				<h2>Developers</h2>
				<p>
					Creators of <span>@Home</span>
				</p>
			</header>
			<ul>
				<li className="contact-dev">
					<div className="contact-details">
						<p>Hosam Dahrooge</p>
						<span>hosamdahrouj56@gmail.com</span>
					</div>
					<div className="contact-icons">
						<a
							target="_blank"
							href="https://www.linkedin.com/in/hosam-dahrooge/"
						>
							<i class="fab fa-linkedin"></i>
						</a>
						<a target="_blank" href="https://github.com/Just-Hosam">
							<i class="fab fa-github"></i>
						</a>
					</div>
				</li>
				<li className="contact-dev">
					<div className="contact-details">
						<p>Nolan Eckert</p>
						<span>nolan.eckert@gmail.com</span>
					</div>
					<div className="contact-icons">
						<a target="_blank" href="https://www.linkedin.com/in/nolaneckert">
							<i class="fab fa-linkedin"></i>
						</a>
						<a target="_blank" href="https://github.com/Nolan-E">
							<i class="fab fa-github"></i>
						</a>
					</div>
				</li>
				<li className="contact-dev">
					<div className="contact-details">
						<p>Kyle Lemmon</p>
						<span>kylej.lemmon@gmail.com</span>
					</div>
					<div className="contact-icons">
						<a
							target="_blank"
							href="https://www.linkedin.com/in/kylejameslemmon/"
						>
							<i class="fab fa-linkedin"></i>
						</a>
						<a target="_blank" href="https://github.com/lemmonk">
							<i class="fab fa-github"></i>
						</a>
					</div>
				</li>
			</ul>
		</div>
	);
}
