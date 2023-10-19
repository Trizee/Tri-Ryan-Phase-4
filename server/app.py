from models import db, User, EventHosts, RSVP, Event, Comments
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask import Flask, make_response, jsonify, request, session
import os
from config import app, db, api

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)
api = Api(app)
app.secret_key = 'super secret key'

#///////////////////////////////////////////////////////////////////////////////////

class Login(Resource):
    def post(self):
        data = request.get_json()
        username= data['username']
        password= data['password']
        user = User.query.filter(User.username == username).first()
        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200
            else:
                return {"Error": "password is wrong"}, 401
        return {"Error": "User doesn't exist"}, 401

api.add_resource(Login, '/login')

class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return user.to_dict(only=('username', 'id'))
        else:
            return {'message': 'Not Authorized'}, 401
        
api.add_resource(CheckSession, '/check_session')


class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {}, 204
    
api.add_resource(Logout, '/logout')

#///////////////////////////////////////////////////////////////////////////////////

class Users(Resource):

    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(users, 200)
    
    def post(self):
        data = request.get_json()
        try:
            new_user = User(
                username = data['username'],
                password_hash = data['password'])
        except ValueError as e:
            return make_response({"errors": ["validation errors"]}, 400)
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id

        return make_response(new_user.to_dict(),201)
    
    
api.add_resource(Users, '/users')
# //////////////////////////////////////////////////////////////////////////////////
class UserByID(Resource):

    def get(self,id):
        user = User.query.filter_by(id = id).first()
        if not user:
            return make_response({"errors":"User not found"},404)
        return make_response(user.to_dict(),200)
    
    def patch(self, id):
        user = User.query.filter_by(id = id).first()
        if user:
            data = request.get_json()
            user.username = data['username']
            user.password = data['password']
            db.session.add(user)
            db.session.commit()
            return make_response(user.to_dict(), 200)
        return make_response({'message': 'User not found'}, 404)
    
    def delete(self,id):
        user = User.query.filter_by(id = id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return make_response({'message': 'User deleted'}, 204)
        return make_response({'message': 'User not found'}, 404)

api.add_resource(UserByID,'/users/<int:id>')
            
#///////////////////////////////////////////////////////////////////////////////////

class Events(Resource):

    def get(self):
        events = [event.to_dict() for event in Event.query.all()]
        return make_response(events,200)
    
    def post(self):
        data = request.get_json()
        try:
            new_event = Event(
                name = data['name'],
                location = data['location'],
                time = data['time'],
                description = data['description'],
                picture = data['picture'])
        except ValueError as e:
            return make_response({'errors': str(e)}, 400)
        db.session.add(new_event)
        db.session.commit()
        return make_response(new_event.to_dict(), 200)
    
    
    
api.add_resource(Events, '/events')
#///////////////////////////////////////////////////////////////////////////////////
class EventsByID(Resource):

    def get(self,id):
        event = Event.query.filter_by(id = id).first
        if not event:
            return make_response({"errors":"User not found"},404)
        return make_response(event.to_dict(),200)
    
    def patch(self, id):
        event = Event.query.filter_by(id = id).first()
        if event:
            data = request.get_json()
            event.location = data['location']
            event.time = data['time']
            event.description = data['description']
            db.session.add(event)
            db.session.commit()
            return make_response(event.to_dict(), 200)
        return make_response({'message': 'User not found'}, 404)
    
    def delete(self,id):
        event = Event.query.filter_by(id = id).first()
        if event:
            db.session.delete(event)
            db.session.commit()
            return make_response({}, 204)
        return make_response({'message': 'User not found'}, 404)

api.add_resource(EventsByID,'/events/<int:id>')

#///////////////////////////////////////////////////////////////////////////////////

class EventHostss(Resource):

    def get(self):
        event_hosts = [event_host.to_dict() for event_host in EventHosts.query.all()]
        return make_response(event_hosts, 200)

    def post(self):
        data = request.get_json()
        try:
            new_event_host = EventHosts(
                user_id=data['user_id'],
                event_id=data['event_id'],)
        except ValueError as e:
            return make_response({"errors": str(e)}, 400)
        db.session.add(new_event_host)
        db.session.commit()
        return make_response(new_event_host.to_dict(), 200)


api.add_resource(EventHostss, '/event_hosts')

#///////////////////////////////////////////////////////////////////////////////////

class EventHostByID(Resource):

    def get(self,id):
        event_host = EventHosts.filter_by(id = id).first()
        if not event_host:
            return make_response({"errors":"User not found"},404)
        return make_response(event_host.to_dict(),200)

    def patch(self,id):
        event_host = EventHosts.filter_by(id = id).first()
        if event_host:
            data = request.get_json()
            event_host.user_id = data['user_id']
            event_host.event_id = data['event_id']
            db.session.add(event_host)
            db.session.commit()
            return make_response(event_host.to_dict(), 200)
        return make_response({"message": "Event Host not found"}, 404)

    def delete(self,id):
        event_host = EventHosts.filter_by(id = id).first()
        if event_host:
            db.session.delete(event_host)
            db.session.commit()
            return make_response({"message": "Event Host deleted"}, 204)
        return make_response({"message": "Event Host not found"}, 404)
    
api.add_resource(EventHostByID, '/event_hosts/<int:id>')

#///////////////////////////////////////////////////////////////////////////////////

class RSVPs(Resource):
    def get(self):
        rsvps = [rsvp.to_dict() for rsvp in RSVP.query.all()]
        return make_response(rsvps, 200)

    def post(self):
        data = request.get_json()
        try:
            new_rsvp = RSVP(
                event_id=data['event_id'],
                user_id=data['user_id'],
                name=data['name'],
                phone=data['phone'],
                status=data['status'])
        except ValueError as e:
            return make_response({"errors": str(e)}, 400)
        db.session.add(new_rsvp)
        db.session.commit()
        return make_response(new_rsvp.to_dict(), 200)

api.add_resource(RSVPs, '/rsvps')

#///////////////////////////////////////////////////////////////////////////////////
class RSVPbyID(Resource):

    def patch(self,id):
        rsvp = RSVP.query.filter_by(id = id).first()
        if rsvp:
            data = request.get_json()
            rsvp.event_id = data['event_id']
            rsvp.user_id = data['user_id']
            rsvp.name = data['name']
            rsvp.phone = data['phone']
            rsvp.status = data['status']
            db.session.add(rsvp)
            db.session.commit()
            return make_response(rsvp.to_dict(), 200)
        return make_response({"message": "RSVP not found"}, 404)

    def delete(self,id):
        rsvp = RSVP.query.filter_by(id = id).first()
        if rsvp:
            db.session.delete(rsvp)
            db.session.commit()
            return make_response({"message": "RSVP deleted"}, 204)
        return make_response({"message": "RSVP not found"}, 404)

api.add_resource(RSVPbyID, '/rsvps/<int:id>') 

#///////////////////////////////////////////////////////////////////////////////////

class Comment(Resource):
    def get(self):
        comments = [comment.to_dict() for comment in Comments.query.all()]
        return make_response(comments, 200)

    def post(self):
        data = request.get_json()
        try:
            new_comment = Comments(
                text=data['text'],
                user_id=data['user_id'],
                event_id=data['event_id'])
        except ValueError as e:
            return make_response({"errors": str(e)}, 400)
        db.session.add(new_comment)
        db.session.commit()
        return make_response(new_comment.to_dict(), 200)
    
#///////////////////////////////////////////////////////////////////////////////////

class CommentById(Resource):

    def get(self,id):
        comment_id = Comments.filter_by(id = id).first()
        if not comment_id:
            return make_response({"errors":"Comment by ID not found"},404)
        return make_response(comment_id.to_dict(),200)

    def patch(self,id):
        comment_id = Comments.filter_by(id = id).first()
        if comment_id:
            data = request.get_json()
            comment_id.text = data['text']
            comment_id.user_id = data['user_id']
            comment_id.event_id = data['event_id']
            db.session.add(comment_id)
            db.session.commit()
            return make_response(comment_id.to_dict(), 200)
        return make_response({"message": "Comment by ID not found"}, 404)

    def delete(self,id):
            comment_id = Comments.filter_by(id = id).first()
            if comment_id:
                db.session.delete(comment_id)
                db.session.commit()
                return make_response({"message": "Comment by ID deleted"}, 204)
            return make_response({"message": "Comment by ID not found"}, 404)


api.add_resource(CommentById, '/comments/<int:id>')
api.add_resource(Comment, '/comments')

if __name__ == '__main__':
    app.run(port=5000, debug=True)
    

