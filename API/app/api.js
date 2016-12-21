var schedule = require('node-schedule');
var nodemailer = require('nodemailer');
//======================== add Doctor and Patient schemas ============================
var Organization = require('./models/organization');
var Coordinator = require('./models/coordinator');
var Client = require('./models/client');
//====================================================================================
module.exports = function (app, express) {
    var api = express.Router();
    var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9+/=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/rn/g, "n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }

    function sendEmail(email) {
        var smtpTransport = nodemailer.createTransport({
            transport: "SMTP",
            host: 'smtp.gmail.com',
            secureConnection: true,
            port: 587,
            requiresAuth: true,
            auth: {
                user: 'care.nomadiccare@gmail.com',
                pass: 'nomadic@care'
            }
        });
        var mailOptions = {
            to: email.to,
            subject: email.subject,
            html: email.text
        }
        smtpTransport.sendMail(mailOptions, function (err, response) {
            if (err) {
                console.log(err);
                return err;
            }
            else
                return 100;
        });
    }

    api.get('/', function (req, res) {
        return res.json({ code: '100', data: 'API is working great v1' });
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

                    var mail = {
                        to: _newObj.Email,
                        subject: 'Nomadic Care | New Provider Activation Mail',
                        text: 'Dear ' + _newObj.Name + '<br/><br/>\
                                This is an activation mail for your account in Nomadic Care <br/><br/>\
                                Your Login Data: <br/>\
                                Email :' + _newObj.Email + '<br/>\
                                Password :' + _newObj.Password + '<br/>\
                                <br/>\
                                <b>Please click the following link to confirm your Email<b> then use your login data To login<br/>\
                                http://localhost:8007/index.html#/login/' + _newObj.RetrivalCode + ' \
                                <br/>\
                                <br/>\
                                Nomadic Care Team'
                    }
                    console.log(mail);
                    sendEmail(mail);
                    _newObj.save(function (err, Obj) {
                        if (err)
                            return res.json({ code: '1', data: err });
                        if (Obj) {
                            // search
                            Coordinator.findOne({ 'Email': _newObj.Email, 'Phone': _newObj.Phone, 'Name': _newObj.Name }, '', function (err, CoordinatorObj) {
                                if (err)
                                    return res.json({ code: '1', data: err });
                                else {
                                    if (CoordinatorObj) {
                                        var BaseImg64 = 'data:image/png;base64,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';
                                        var base64Data = BaseImg64.replace(/^data:image\/png;base64,/, "");
                                        require("fs").writeFile("images/" + CoordinatorObj._id + ".png", base64Data, 'base64', function (err) {
                                            console.log(err);
                                            return res.json({ code: '100', data: Obj });
                                        });
                                    }
                                }
                            });
                        }
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


    api.get('/CarerPlansByEmail/:CoordinatorEmail', function (req, res) {
        var _Email = req.params.CoordinatorEmail;
        console.log(_Email);
        Client.find('', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj) {
                    var planList = [];
                    for (var k = 0; k < Obj.length; k++) {
                        for (var i = 0; i < Obj[k].CarePlans.length; i++) {
                            if (Obj[k].CarePlans[i].ByWho1.Email == _Email || Obj[k].CarePlans[i].ByWho2.Email == _Email) {
                                var newObj = {};
                                newObj.plan = Obj[k].CarePlans[i];
                                newObj.clientId = Obj[k]._id;
                                newObj.clientName = Obj[k].FirstName + " " + Obj[k].LastName;
                                newObj.clientImg = Obj[k].Img;
                                planList.push(newObj);
                            }
                        }
                    }
                    return res.json({ code: '100', data: planList });
                }
                else
                    return res.json({ code: '20', data: 'No plans found' });
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
                    Obj.Email = req.body.Email;
                    Obj.Img = req.body.Img;
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
    api.post('/Client', function (req, res) {
        var _newObj = new Client(req.body);
        Client.findOne({ 'LastName': _newObj.LastName, 'FirstName': _newObj.FirstName, 'Email': _newObj.Email, 'Mobile': _newObj.Mobile }, '', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj)
                    return res.json({ code: '20', data: 'Duplicae data, check email, mobile and name' });
                else {
                    _newObj.save(function (err, Obj) {
                        if (err)
                            return res.json({ code: '1', data: err });
                        else {
                            Client.findOne({ 'LastName': Obj.LastName, 'FirstName': Obj.FirstName }, '', function (err, clientObj) {
                                if (err)
                                    return res.json({ code: '1', data: err });
                                else {
                                    if (clientObj) {
                                        console.log(clientObj._id);
                                        if (clientObj.Img && clientObj.Img.length > 5) {
                                            console.log('if');
                                            var base64Data = clientObj.Img.replace(/^data:image\/png;base64,/, "");
                                            require("fs").writeFile("images/" + clientObj._id + ".png", base64Data, 'base64', function (err) {
                                                console.log(err);
                                                return res.json({ code: '100', data: Obj });
                                            });
                                        }
                                        else { //no user img
                                            console.log('else');
                                            var base64Data = clientObj.Img.replace(/^data:image\/png;base64,/, "");
                                            require("fs").writeFile("images/" + clientObj._id + ".png", base64Data, 'base64', function (err) {
                                                console.log(err);
                                                return res.json({ code: '100', data: Obj });
                                            });
                                        }
                                    }
                                }
                            });

                        }
                    })
                }
            }
        });
    });


    api.put('/CarePlans', function (req, res) {
        Client.findOne({ _id: req.body._id }, '', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj) {
                    //schedual
                    for (var i = 0; i < req.body.CarePlans.length; i++) {
                        if (req.body.CarePlans[i].IsNew == true && req.body.CarePlans[i].ByWho1.Email != 'example@mail.com') {
                            req.body.CarePlans[i].IsNew = false;
                            //send schedual emails 1
                            var mail = {
                                to: req.body.CarePlans[i].ByWho1.Email,
                                subject: 'Nomadic Care | Plan Reminder',
                                text: 'Dear ' + req.body.CarePlans[i].ByWho1.Email + '<br/><br/>\
                                               This is a gentle reminder about your plan due date on <br/>\
                                               ' + req.body.CarePlans[i].ByWhen1 + '<br/>\
                                               <br/>\
                                               Nomadic Care Team'
                            }
                            var j = schedule.scheduleJob('* * 8 * ' + new Date(req.body.CarePlans[i].ByWhen1).getDay(), function () {
                                sendEmail(mail);
                            });
                            var result = new Date(req.body.CarePlans[i].ByWhen1); console.log(result);
                            result.setDate(result.getDate() + 7); console.log(result);
                            var jj = schedule.scheduleJob(result, function () {
                                console.log('doooooooone');
                                sendEmail(mail);
                            });

                            // send schedual emails 2
                            var mail2 = {
                                to: req.body.CarePlans[i].ByWho2.Email,
                                subject: 'Nomadic Care | Plan Reminder',
                                text: 'Dear ' + req.body.CarePlans[i].ByWho2.Email + '<br/><br/>\
                                               This is a gentle reminder about your plan due date on <br/>\
                                               ' + req.body.CarePlans[i].ByWhen2 + '<br/>\
                                               <br/>\
                                               Nomadic Care Team'
                            }
                            var j = schedule.scheduleJob('* * 8 * ' + new Date(req.body.CarePlans[i].ByWhen2).getDay(), function () {
                                sendEmail(mail);
                            });
                            var result2 = new Date(req.body.CarePlans[i].ByWhen2);
                            result2.setDate(result2.getDate() + 7);
                            var j2 = schedule.scheduleJob(result2, function () {
                                sendEmail(mail2);
                            });

                        }

                    }
                    Obj.CarePlans = req.body.CarePlans;
                    Client.update({ _id: Obj._id }, Obj, { upsert: true }, function (err) {
                        if (err) {
                            res.json({ code: '1', data: err });
                            return;
                        }
                        else {
                            // get provider data & redirect to carer portal
                            for (var i = 0; i < req.body.emailTo.length; i++) {
                                // send email to provider to enter their portals (by email)
                                var mail = {
                                    to: req.body.emailTo[i],
                                    subject: 'Nomadic Care | Care Plans Changed',
                                    text: 'Dear ' + req.body.emailTo[i] + '<br/><br/>\
                                There is some changes happened in your care plans in Nomadic Care, <br/><br/>\
                                Please click the following link to login and find out what has been changed .<br/>\
                                http://localhost:1169/index.html#/' + Base64.encode(req.body.emailTo[i]) + ' \
                                <br/>\
                                <br/>\
                                Nomadic Care Team'
                                }
                                console.log(mail);
                                sendEmail(mail);
                            }

                            // send email to client & redirect to client portal (by Id)
                            var mail = {
                                to: Obj.Email,
                                subject: 'Nomadic Care | Care Plans Changed',
                                text: 'Dear ' + Obj.FirstName + ' ' + Obj.LastName + '<br/><br/>\
                                There is some changes happened in your care plans in Nomadic Care, <br/><br/>\
                                Please click the following link to login and find out what has been changed .<br/>\
                                http://localhost:1406/index.html#/' + Obj._id + ' \
                                <br/>\
                                <br/>\
                                Nomadic Care Team'
                            }
                            console.log(mail);
                            sendEmail(mail);

                            return res.json({ code: '100', data: 'Updated' });
                            //Send required emails
                        }
                    });
                }
                else
                    return res.json({ code: '20', data: 'Client not exist' });
            }
        });
    });
    api.get('/CarePlans/:organizationId', function (req, res) {
        Client.find({}, '', function (err, lst) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (lst) {
                    var _lst = [];
                    //console.log(lst);
                    for (var i = 0 ; i < lst.length; i++) {
                        //console.log(req.params.organizationId);
                        if (lst[i].Coordinator)
                            console.log(lst[i].Coordinator.Organization);
                        if (lst[i].Coordinator && lst[i].Coordinator.Organization.equals(req.params.organizationId)) {
                            if (lst[i].CarePlans && lst[i].CarePlans.length > 0) {
                                _lst = _lst.concat(lst[i]);
                            }
                        }
                    }
                    return res.json({ code: '100', data: _lst });
                }
                else
                    return res.json({ code: '20', data: 'Care plans not exist' });
            }
        }).populate('Coordinator');
    });

    api.put('/CarePlans/ProgressNotes', function (req, res) {
        Client.findOne({ _id: req.body.clientId }, '', function (err, FoundClient) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (FoundClient) {
                    for (var i = 0; i < FoundClient.CarePlans.length; i++) {
                        if (FoundClient.CarePlans[i]._id == req.body.planId) {
                            FoundClient.CarePlans[i].Progress = req.body.notes;
                            console.log(FoundClient.CarePlans[i].Progress);
                            Client.update({ _id: req.body.clientId }, FoundClient, { upsert: true }, function (err) {
                                return res.json({ code: '100', data: 'Updated' });
                            });
                        }
                    }
                }
                else
                    return res.json({ code: '20', data: 'Client not exist' });
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


    api.post('/HealthNotes/:id', function (req, res) {
        var _id = req.params.id
        Client.findOne({ '_id': _id }, '', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj) {
                    if (req.body.File) {
                        console.log(req.body._id); // undefined 
                        var base64Data = req.body.File.replace(/^data:application\/pdf;base64,/, "");
                        require("fs").writeFile("pdfs/" + req.body.FileName + ".pdf", base64Data, 'base64', function (err) {
                            console.log(err);
                        });
                    }
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


    return api;
};