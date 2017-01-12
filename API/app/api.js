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
                                Welcome to Nomadic Care - the easy online health client care management tool.<br/><br/>\
                                Your account username is :' + _newObj.Email + '<br/>\
                                Your account Password is :' + _newObj.Password + '<br/>\
                                <br/>\
                                Please click the link below to activate your account and set your own password.\
                                <br/>\
                                <a href="http://localhost:8007/index.html#/login/' + _newObj.RetrivalCode + '">http://localhost:8007/index.html#/login/' + _newObj.RetrivalCode + '</a>  \
                                <br/>\
                                If you have any questions, please contact us at customer.care@nomadictec.com.au <br/>\
                                <br/>\
                                Kind Regards,\
                                <br/>\
                                Nomadic Care Team <br/>\
                                <img src="data:image/png;base64,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" />'
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
    api.put('/Coordinator/Password', function (req, res) {
        Coordinator.findOne({ Email: req.body.Email, Password: req.body.Password }, '', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj && Obj.Email == req.body.Email) {
                    Obj.Password = req.body.NewPassword;
                    Coordinator.update({ _id: Obj._id }, Obj, { upsert: true }, function (err) {
                        return res.json({ code: '100', data: Obj });
                    });
                }
            }
        });
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