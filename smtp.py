import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import os
import sys

# Example usage
def attach_file(msg, filename):
    with open(filename, "rb") as attachment:
        part = MIMEBase("application", "octet-stream")
        part.set_payload(attachment.read())
        encoders.encode_base64(part)
        part.add_header(
            "Content-Disposition",
            f"attachment; filename= {filename}",
        )
        msg.attach(part)

# Example usage
def send_email(to_email, resume_file, cover_letter_file):
    subject = "68662122: Application for Intermediate Python Developers Position"
    body = """
    Dear Hiring Manager,

    I hope this message finds you well. I am writing to express my interest in the Intermediate Python Developers position.

    Please find attached my resume and cover letter for your review. 

    Thank you for considering my application.

    Best regards,
    Automated Email
    """

    msg = MIMEMultipart()
    msg['From'] = "68662122@mylife.unisa.ac.za"
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    attach_file(msg, resume_file)
    attach_file(msg, cover_letter_file)

    from_email = "68662122@mylife.unisa.ac.za"
    password = os.getenv('mylife_password')  # Ensure the environment variable is set

    server = smtplib.SMTP('smtp.office365.com', 587)
    server.starttls()
    server.login(from_email, password)
    server.send_message(msg)
    server.quit()

if __name__ == '__main__':
    if len(sys.argv) != 4:
        print("Usage: python smtp.py <to_email> <resume_file> <cover_letter_file>")
        sys.exit(1)

    to_email = sys.argv[1]
    resume_file = sys.argv[2]
    cover_letter_file = sys.argv[3]

    result = send_email(to_email, resume_file, cover_letter_file)