//======================== add Doctor and Patient schemas ============================
var Organization = require('./models/organization');
var Coordinator = require('./models/coordinator');
var Client = require('./models/client');
//====================================================================================
module.exports = function (app, express) {
    var api = express.Router();
    api.get('/', function (req, res) {
        return res.json({ code: '100', data: 'API is working great' });
    });
    api.get('/Coordinator/List', function (req, res) {
        var _id = req.params.OrganizationId;
        Coordinator.find({}, 'Name Location _id ', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj) {
                    if (Obj.length > 0)
                        return res.json({ code: '100', data: Obj });
                    else
                        return res.json({ code: '21', data: 'No data found' });
                }
                else
                    return res.json({ code: '20', data: 'No such organization' });
            }
        });
    });

    api.get('/Coordinator/List/:OrganizationId', function (req, res) {
        var _id = req.params.OrganizationId;
        console.log(_id);
        Coordinator.find({ 'Organization': _id }, 'Name Location _id ', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj) {
                    if (Obj.length > 0)
                        return res.json({ code: '100', data: Obj });
                    else
                        return res.json({ code: '21', data: 'No coordinators in this organization' });
                }
                else
                    return res.json({ code: '20', data: 'No such organization' });
            }
        });
    });
    api.get('/Coordinator/:CoordinatorId', function (req, res) {
        var _id = req.params.CoordinatorId;
        console.log(_id);
        Coordinator.find({ '_id': _id }, '', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj) {
                    if (Obj.length > 0)
                        return res.json({ code: '100', data: Obj });
                    else
                        return res.json({ code: '21', data: 'No coordinator with such id' });
                }
                else
                    return res.json({ code: '20', data: 'No coordinator with such id' });
            }
        });
    });
    api.get('/Coordinator/Confirm/:code', function (req, res) {
        var _code = req.params.code;
        Coordinator.findOne({ 'RetrivalCode': _code }, '', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj) {
                    if (Obj.Status == 'Active')
                        return res.json({ code: '101', data: 'Coordinator Account Already Activaed' });
                    Obj.Status = 'Active';
                    Coordinator.update({ _id: Obj._id }, Obj, { upsert: true }, function (err) {
                        return res.json({ code: '100', data: 'Coordinator Account Activaed' });
                    });
                }
                else
                    return res.json({ code: '20', data: 'User not exist' });
            }
        });
    });
    api.post('/Coordinator', function (req, res) {
        var _newObj = new Coordinator(req.body);
        Coordinator.findOne({ 'Email': _newObj.Email, 'Phone': _newObj.Phone, 'Name': _newObj.Name }, '', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj)
                    return res.json({ code: '20', data: 'Duplicae data, check email, phone and name' });
                else {
                    if (_newObj.Img && _newObj.Img.length > 5) {
                        var base64Data = _newObj.Img.replace(/^data:image\/png;base64,/, "");
                        require("fs").writeFile("images/" + _newObj._id + ".png", base64Data, 'base64', function (err) {
                            console.log(err);
                        });
                    }
                    _newObj.save(function (err, Obj) {
                        if (err)
                            return res.json({ code: '1', data: err });
                        else
                            return res.json({ code: '100', data: Obj });
                    })
                }
            }
        });
    });
    api.put('/Coordinator', function (req, res) {
        Coordinator.findOne({ Name: req.body.Name, Phone: req.body.Phone, PostalCode: req.body.PostalCode }, '', function (err, Obj) {
            if (Obj && Obj._id != req.body._id) {
                return res.json({ code: '21', data: 'Update may create duplicate record.' });
            }
        }).then(
        Coordinator.findOne({ _id: req.body._id }, '', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj) {
                    Obj = req.body;
                    var base64Data = req.body.Img.replace(/^data:image\/png;base64,/, "");
                    require("fs").writeFile("images/" + req.body._id + ".png", base64Data, 'base64', function (err) {
                        console.log(err);
                    });
                    Coordinator.update({ _id: Obj._id }, Obj, { upsert: true }, function (err) {
                        return res.json({ code: '100', data: 'Updated' });
                    });
                }
                else
                    return res.json({ code: '20', data: 'Coordinator not exist' });
            }
        }));
    });
    api.put('/Coordinator/Remove/:id', function (req, res) {
        var _id = req.params.id
        Coordinator.find({ _id: _id }).remove(function (err) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                return res.json({ code: '100', data: 'Removed' });
            }
        });
    });
    api.put('/Organization', function (req, res) {
        Organization.findOne({ Name: req.body.Name, Phone: req.body.Phone, PostalCode: req.body.PostalCode }, '', function (err, Obj) {
            if (Obj && Obj._id != req.body._id) {
                return res.json({ code: '21', data: 'Update may create duplicate record.' });
            }
        }).then(
        Organization.findOne({ _id: req.body._id }, '', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj) {
                    Obj = req.body;
                    Organization.update({ _id: Obj._id }, Obj, { upsert: true }, function (err) {
                        return res.json({ code: '100', data: Obj });
                    });
                }
                else
                    return res.json({ code: '20', data: 'Organization not exist' });
            }
        }));
    });
    api.post('/Organization', function (req, res) {
        var _newObj = new Organization(req.body);
        Organization.findOne({ 'Phone': _newObj.Phone, 'Email': _newObj.Email, 'Name': _newObj.Name }, '', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj)
                    return res.json({ code: '20', data: Obj });
                else
                    _newObj.save(function (err, Obj) {
                        if (err)
                            return res.json({ code: '1', data: err });
                        else
                            return res.json({ code: '100', data: Obj });
                    })
            }
        });
    });
    api.get('/Organization', function (req, res) {
        Organization.find('', '', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj && Obj.length > 0)
                    return res.json({ code: '100', data: Obj });
                else
                    return res.json({ code: '20', data: 'No such data' });
            }
        });
    });
    api.get('/Organization/:id', function (req, res) {
        var _id = req.params.id
        Organization.findOne({ _id: _id }, '', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj)
                    return res.json({ code: '100', data: Obj });
                else
                    return res.json({ code: '20', data: 'No such data' });
            }
        });
    });
    api.put('/Organization/:id/:total', function (req, res) {
        var _id = req.params.id
        console.log(req.params);
        Organization.find({ _id: _id }).remove(function (err) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                return res.json({ code: '100', data: 'Removed' });
            }
        });
    });
    api.post('/Login', function (req, res) {
        var UserAccount = { Email: req.body.Email, Password: req.body.Password };
        if (UserAccount.Email && UserAccount.Password) {
            if (UserAccount.Email == 'system@nomadiccare.com.au' && UserAccount.Password == 'XX&^354_)984HHa@')
                return res.json({ code: '101', data: null });
            else {
                Coordinator.findOne({ Email: UserAccount.Email, Password: UserAccount.Password }, '', function (err, Obj) {
                    if (err)
                        return res.json({ code: '1', data: err });
                    else {
                        if (Obj) {

                            if (Obj.Status == 'Active')
                                return res.json({ code: '100', data: Obj });
                            else
                                return res.json({ code: '21', data: 'Email not confirmed' });
                        }
                        else {
                            return res.json({ code: '20', data: 'Incorrect login information' });
                        }
                    }
                });
            }
        }
        else {
            return res.json({ code: '20', data: 'Incorrect login information' });
        }

    });
    api.put('/Client', function (req, res) {
        Coordinator.findOne({ FirstName: req.body.FirstName, LastName: req.body.LastName, Phone: req.body.Phone, PostalCode: req.body.PostalCode }, '', function (err, Obj) {
            if (Obj && Obj._id != req.body._id) {
                return res.json({ code: '21', data: 'Update may create duplicate record.' });
            }
        }).then(
        Client.findOne({ _id: req.body._id }, '', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj) {
                    Obj.Coordinator = req.body.Coordinator;
                    Obj.FirstName = req.body.FirstName;
                    Obj.LastName = req.body.LastName;
                    Obj.Mobile = req.body.Mobile;
                    Obj.DateOfBirth = req.body.DateOfBirth;
                    Obj.Gender = req.body.Gender;
                    Obj.BloodType = req.body.BloodType;
                    if (req.body.Img) {
                        var base64Data = req.body.Img.replace(/^data:image\/png;base64,/, "");
                        require("fs").writeFile("images/" + req.body._id + ".png", base64Data, 'base64', function (err) {
                            console.log(err);
                        });
                    }
                    Client.update({ _id: Obj._id }, Obj, { upsert: true }, function (err) {
                        return res.json({ code: '100', data: 'Updated' });
                    });
                }
                else
                    return res.json({ code: '20', data: 'Client not exist' });
            }
        }));
    });
    api.put('/CarePlans', function (req, res) {
        Client.findOne({ _id: req.body._id }, '', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj) {
                    Obj.CarePlans = req.body.CarePlans;
                    Client.update({ _id: Obj._id }, Obj, { upsert: true }, function (err) {
                        return res.json({ code: '100', data: 'Updated' });
                        //Send required emails
                    });
                }
                else
                    return res.json({ code: '20', data: 'Client not exist' });
            }
        });
    });

    api.post('/Client', function (req, res) {
        var _newObj = new Client(req.body);
        Client.findOne({ 'LastName': _newObj.LastName, 'FirstName': _newObj.FirstName }, '', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                console.log(Obj);
                if (Obj)
                    return res.json({ code: '20', data: 'Duplicae data, check email, phone and name' });
                else {
                    if (_newObj.Img && _newObj.Img.length > 5) {
                        var base64Data = _newObj.Img.replace(/^data:image\/png;base64,/, "");
                        require("fs").writeFile("images/" + _newObj._id + ".png", base64Data, 'base64', function (err) {
                            console.log(err);
                        });
                    }
                    _newObj.save(function (err, Obj) {
                        if (err)
                            return res.json({ code: '1', data: err });
                        else
                            return res.json({ code: '100', data: Obj });
                    })
                }
            }
        });
    });
    api.post('/HealthNotes/:id', function (req, res) {
        var _id = req.params.id
        Client.findOne({ '_id': _id }, '', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj) {
                    if (Obj.HealthNotes) {
                        Obj.HealthNotes.push(req.body);
                    }
                    else {
                        Obj.HealthNotes = [];
                        Obj.HealthNotes.push(req.body);
                    }
                    Client.update({ _id: Obj._id }, Obj, { upsert: true }, function (err) {
                        return res.json({ code: '100', data: 'Updated' });
                    });

                }
                else {
                    return res.json({ code: '20', data: 'No client with such id' });
                }
            }
        });
    });
    api.get('/HealthNotes/:id/:type', function (req, res) {
        var _id = req.params.id
        Client.findOne({ '_id': _id }, 'HealthNotes', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj) {
                    var _lst = []
                    for (var i = 0 ; i < Obj.HealthNotes.length; i++) {
                        if (Obj.HealthNotes[i].HNType && Obj.HealthNotes[i].HNType == req.params.type) {
                            _lst.push(Obj.HealthNotes[i]);
                        }
                    }
                    return res.json({ code: '100', data: _lst });
                }
                else {
                    return res.json({ code: '20', data: 'No data available' });
                }
            }
        });
    });
    api.get('/HealthNotes/:id/', function (req, res) {
        var _id = req.params.id
        Client.findOne({ '_id': _id }, 'HealthNotes', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj) {
                    return res.json({ code: '100', data: Obj.HealthNotes });
                }
                else {
                    return res.json({ code: '20', data: 'No data available' });
                }
            }
        });
    });
    api.post('/HealthMeasurments/:id', function (req, res) {
        var _id = req.params.id
        Client.findOne({ '_id': _id }, '', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj) {
                    if (Obj.HealthMeasurments) {
                        Obj.HealthMeasurments.push(req.body);
                    }
                    else {
                        Obj.HealthMeasurments = [];
                        Obj.HealthMeasurments.push(req.body);
                    }
                    Client.update({ _id: Obj._id }, Obj, { upsert: true }, function (err) {
                        return res.json({ code: '100', data: 'Updated' });
                    });

                }
                else {
                    return res.json({ code: '20', data: 'No client with such id' });
                }
            }
        });
    });
    api.get('/HealthMeasurments/:id/:type', function (req, res) {
        var _id = req.params.id
        Client.findOne({ '_id': _id }, 'HealthMeasurments', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj) {
                    var _lst = []
                    for (var i = 0 ; i < Obj.HealthMeasurments.length; i++) {
                        if (Obj.HealthMeasurments[i].HNType && Obj.HealthMeasurments[i].HNType == req.params.type) {
                            _lst.push(Obj.HealthMeasurments[i]);
                        }
                    }
                    return res.json({ code: '100', data: _lst });
                }
                else {
                    return res.json({ code: '20', data: 'No data available' });
                }
            }
        });
    });
    api.get('/HealthMeasurments/:id/', function (req, res) {
        var _id = req.params.id
        Client.findOne({ '_id': _id }, 'HealthMeasurments', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj) {
                    return res.json({ code: '100', data: Obj.HealthMeasurments });
                }
                else {
                    return res.json({ code: '20', data: 'No data available' });
                }
            }
        });
    });
    api.post('/ConsultationNotes/:id', function (req, res) {
        var _id = req.params.id
        Client.findOne({ '_id': _id }, '', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj) {
                    if (Obj.ConsultationNotes) {
                        Obj.ConsultationNotes.push(req.body);
                    }
                    else {
                        Obj.ConsultationNotes = [];
                        Obj.ConsultationNotes.push(req.body);
                    }
                    Client.update({ _id: Obj._id }, Obj, { upsert: true }, function (err) {
                        return res.json({ code: '100', data: 'Updated' });
                    });

                }
                else {
                    return res.json({ code: '20', data: 'No client with such id' });
                }
            }
        });
    });
    api.get('/ConsultationNotes/:id', function (req, res) {
        var _id = req.params.id
        Client.findOne({ '_id': _id }, 'ConsultationNotes', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj) {
                    return res.json({ code: '100', data: Obj.ConsultationNotes });
                }
                else {
                    return res.json({ code: '20', data: 'No data available' });
                }
            }
        });
    });
    api.get('/Client/:ClientId', function (req, res) {
        var _id = req.params.ClientId;
        console.log(_id);
        Client.find({ '_id': _id }, '', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj) {
                    if (Obj.length > 0)
                        return res.json({ code: '100', data: Obj });
                    else
                        return res.json({ code: '21', data: 'No Client with such id' });
                }
                else
                    return res.json({ code: '20', data: 'No Client with such id' });
            }
        });
    });
    api.get('/Client/List/:CoordinatorId', function (req, res) {
        var _id = req.params.CoordinatorId;
        console.log(_id);
        Client.find({ 'Coordinator': _id }, 'FirstName LastName Img _id', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj) {
                    if (Obj.length > 0)
                        return res.json({ code: '100', data: Obj });
                    else
                        return res.json({ code: '21', data: 'No Clients in this organization' });
                }
                else
                    return res.json({ code: '20', data: 'No such Coordinator' });
            }
        });
    });

    return api;
};