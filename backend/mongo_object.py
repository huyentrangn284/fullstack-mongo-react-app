
class MongoObject():
    def __init__(self, Object: dict):
        self.id = str(Object["_id"])
        self.name = Object["name"]
        self.email = Object["email"]
        self.contact = Object["contact"]
        self.address = Object["address"]
        self.age = Object["age"]
        self.is_delete = Object["is_delete"]

    def to_dict(self):
        data = self.__dict__
        data.pop("is_delete")
        return data



