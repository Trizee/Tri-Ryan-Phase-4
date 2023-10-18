from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.sql import func
from config import db, bcrypt

#///////////////////////////////////////////////////////////////////////////////////

class User( db.Model, SerializerMixin):
    __tablename__ ="user_table"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)

    rsvps =db.relationship('RSVP', backref='user')
    event_hosts =db.relationship('EventHosts', backref='user')
    comments =db.relationship('Comments', backref='user')

#///////////////////////////////////////////////////////////////////////////////////

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )
    
#///////////////////////////////////////////////////////////////////////////////////

class EventHosts(db.Model, SerializerMixin):
    __tablename__ ="event_hosts_table"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user_table.id"))
    event_id = db.Column(db.Integer, db.ForeignKey("event_table.id"))
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    serialize_rules=('-user','-event')

#///////////////////////////////////////////////////////////////////////////////////

class RSVP(db.Model, SerializerMixin):
    __tablename__ ="rsvp_table"

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey("event_table.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("user_table.id"))
    name = db.Column(db.String)
    phone = db.Column(db.Integer)
    status = db.Column(db.String)

    serialize_rules=('-user','-event')

#///////////////////////////////////////////////////////////////////////////////////

class Event(db.Model, SerializerMixin):
    __tablename__ ="event_table"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable = False)
    location = db.Column(db.String)
    time = db.Column(db.Integer)
    description = db.Column(db.String)

    rsvps =db.relationship('RSVP', backref='event')
    event_hosts =db.relationship('EventHosts', backref='event')

    comments =db.relationship('Comments', backref='event')

#///////////////////////////////////////////////////////////////////////////////////

class Comments(db.Model, SerializerMixin):
    tablename = 'comments_table'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('user_table.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('event_table.id'))

    serialize_rules=('-user','-event')