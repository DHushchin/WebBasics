import smtplib, os
from email.mime.text import MIMEText
from phonenumbers import parse, is_valid_number
from validators import email
from re import fullmatch
from flask import escape
from validate_email import validate_email


class Mailer:
    def __init__(self, data: dict):
        self.data = {escape(key): escape(value) for key, value in data.items()}  # sanitize data

    def validate(self) -> bool:
        try:
            return \
                validate_email(self.data['email']) and \
                4 <= len(self.data['email'][0:self.data['email'].find('@')]) <= 32  and \
                is_valid_number(parse(self.data['phone'], 'UA')) and \
                bool(fullmatch(r'[A-Za-z]{2,25}( [A-Za-z]{2,25})?', self.data['name'])) \
                and bool(fullmatch(r'[A-Za-z]{2,25}( [A-Za-z]{2,25})?', self.data['surname'])) \
                and self.data['age'].isdigit() \
                and 0 < int(self.data['age']) < 130
        except:
            return False

    def read_html(self):
        try:
            with open("templates/letter.html") as file:
                template = str(file.read())
                template = template.replace('namename', self.data['name'])
                template = template.replace('surnamesurname', self.data['surname'])
                template = template.replace('ageage', self.data['age'])
                template = template.replace('phonephone', self.data['phone'])
                template = template.replace('mailmail', self.data['email'])
            return template
        except IOError:
            return "The template file doesn't found!"

    def send_email(self):
        sender = os.getenv('EMAIL_NAME')
        password = os.getenv('EMAIL_PASSWORD')
        server = smtplib.SMTP(os.getenv("SMTP_EMAIL"), int(os.getenv("SMTP_PORT")))
        server.starttls()

        if not self.validate():
            return "You entered incorrect data. Please, try again."
        try:
            server.login(sender, password)
            msg = MIMEText(self.read_html(), "html")
            msg["From"] = sender
            msg["To"] = self.data['email']
            msg["Subject"] = "Your sign up!"
            server.sendmail(sender, self.data['email'], msg.as_string())
            return "The message was sent successfully!"
        except Exception as _ex:
            return f"{_ex}\nCheck your login or password please!"
