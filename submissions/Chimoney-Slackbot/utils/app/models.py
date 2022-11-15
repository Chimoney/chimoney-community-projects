from app import db


class AccessToken(db.Model):
    __tablename__ = "access_token"
    id = db.Column(db.Integer, primary_key=True)
    team_id = db.Column(db.String(255), unique=True, nullable=False)
    access_token = db.Column(db.String(255), unique=True, nullable=False)

    def __init__(self, team_id, access_token) -> None:
        self.team_id = team_id
        self.access_token = access_token

    def __repr__(self) -> str:
        return f"Team ID: {self.team_id}, Access Token: {self.access_token}"


def init_db():
    db.create_all()


if __name__ == "__main__":
    init_db()
