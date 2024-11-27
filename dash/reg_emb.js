/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var url = "https:esafeafrica.com/api.monitoring_mglsd/service/";
//var url = "http://localhost:8080/api.esafe/service/";


var user = '';
var role = '';
var type = '';
var organs = '';
var act_name = '';
$(document).ready(function () {
//document.getElementById('all').style.display = 'block';
//sendEmail();
    loadOrgan('UG', 'mw_lco', "<option  disabled selected hidden >Choose Kenya/Sending Recruitment Agency</option>");
    loadOrgan('SA', 'mw_fco', "<option  disabled selected hidden >Choose Saudi/Receiving Recruitment Agency</option>");
    //loadCity();

});
function createNode(element) {
    return document.createElement(element);
}
function append(parent, el) {
    return parent.appendChild(el);
}


function setPic() {
    const pic = document.getElementById("picture");//.value;
    //let details = document.getElementById("tag").value;
    img.src = URL.createObjectURL(pic.files[0]);
}


function loadMW() {
//document.getElementById("mw_passport").style.display = 'block';
//document.getElementById('nin').style.display = 'block';
//document.getElementById('mw_name_f').style.display = 'block';//mw_name_m ,mw_name_s
//document.getElementById('mw_userid').style.display = 'block';
//document.getElementById('mw_id_user').style.display = 'block';
//document.getElementsByName('mw_whatsapp_no').style.display = 'block';
//document.getElementById('mw_passport').style.display = 'block';
//document.getElementsByName('mw_lorg').style.display = 'block';
//document.getElementsByName('mw_forg').style.display = 'block';
}

function checkVAR(input) {
//console.log(input);
    if (!input) {
        return "NA";
    } else {
        return input;
    }
}

document.getElementById('auto_btn').addEventListener('click', getMw);
function getMw(event) {
    event.preventDefault();
    var pass = document.getElementById('mw_passport').value;
    try {
        $.ajax({
            url: url + "fetch/workers/" + pass,
            dataType: 'json',
            type: 'get',
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function () {
                //reset container
            },
            complete: function (data) {
                //upon completion
                //alert("Finished Loading");
            },
            success: function (data) {
                var e_data = '';
                try {
                    //$("#logs").empty();
                    let row = "";
                    let i = 1;
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.user_worker;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            //var value = jdata;
                            //console.log(jdata.names);
                            var nam = jdata.names;
                            const myArray = nam.split(" ");
                            let fname = myArray[0];
                            let sname = myArray[1];
                            let mname = myArray[2];
                            //console.log(checkVAR(fname));
                            //console.log(checkVAR(sname));
                            // console.log(checkVAR(mname));


                            document.getElementById('mw_userid').value = jdata.userid;
                            document.getElementById('mw_name_f').value = checkVAR(fname); //mw_name_m ,mw_name_s
                            document.getElementById('mw_name_s').value = checkVAR(sname); //mw_name_m ,mw_name_s
                            document.getElementById('mw_name_m').value = checkVAR(mname); //mw_name_m ,mw_name_s
                            //document.getElementById('mw_id_user').innerHTML = jdata.userid;
                            document.getElementById('mw_whatsapp_no').value = jdata.phone;
                            document.getElementById("img").src = "data:image/png;base64," + jdata.pic;
                            //document.getElementById('mw_passport').value = jdata.passport;
                            //document.getElementsByName('mw_lorg').value = jdata.userid;
                            //document.getElementsByName('mw_forg').value = jdata.userid;
                            setOrgan(jdata.lcompany, 'mw_lco');
                            setOrgan(jdata.fcompany, 'mw_fco');

                            alert("Your Are Already Registered");

                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.user_worker, function (index, value) {
                                alert("Error while loading user data");
                                //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                                //++i;
                            });
                        }
                    } else {
                        alert("No Data to load");
                    }
                    //appending data
                    //$("#logs").append(e_data);
                } catch (e) {
                    console.log(e);
                }
            },
            error: function (d) {
                //$("#id").html()
                ShowError("Response Error");
                if (ajaxOptions === 'timeout') {
                    ShowError("Ajax Error", "Connection TimeOut");
                } else {
                    ShowError("Ajax Error", "Something went wrong!");
                }
            }});
    } catch (ex) {
        ShowError("Exception", ex);
    }
}


function loadOrgan(input, elem, opt) {
    try {
        $.ajax({
//
            url: url + "fetch/organs_cty_bi/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                // $("#prop_body").html('<tr><td colspan="5" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');

            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#model_mw_organ").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.organ;
                        if (!isJsonArray(jdata)) {
                            //console.log(jdata.id);
                            e_data += '<option id="' + jdata.organid + '" ma="' + jdata.email + '" name="' + jdata.phone + '" ">';
                            e_data += jdata.names;
                            e_data += '</option>';
                        } else {
                            $.each(data.organ, function (index, value) {
                                //console.log(value.id);
                                e_data += '<option id="' + value.organid + '" ma="' + value.email + '" name="' + value.phone + '" ">';
                                e_data += value.names;
                                e_data += '</option>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    //$("#" + elem).append(opt);
                    $("#" + elem).append(e_data);
                    //console.log(e_data);
                    //setSearch(elem);
                } catch (e) {
                    ShowError("Response Error", e, loadOrgan);
                }
            },
            error: function (d) {
                console.log(d);
                //$("#gallery_table").html('<tr><td colspan="5" align="center">Sorry an Expected error Occured.</td></tr>');
                if (ajaxOptions === 'timeout') {
                    alert("ajax Error", "Connection Timeout");
                } else {
                    alert("ajax Error", "Sorry! Something wrong, please try again");
                    //ShowError("ajax Error", thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
                }
                //console.log(d);
            }
        });
    } catch (ex) {
        alert("Exception", ex);
    }
}







function chooseSector() {
    let id = $("#mw_emp_sector :selected").attr('id');
    if (id === "1") {
        document.getElementById('mw').style.display = 'block';
        //document.getElementById('mw_all_cat').style.display = 'block';
        document.getElementById('mw_all_cat').style.display = 'block';
        //document.getElementById('no_mw').style.display = 'block';
        //document.getElementById('mw').style.display = 'block';
    } else if (id === "2") {
//document.getElementById('yes_mw').style.display = 'none';
//document.getElementById('no_mw').style.display = 'block';
        document.getElementById('mw').style.display = 'block';
        document.getElementById('mw_all_cat').style.display = 'block';
    } else {
    }
}


function chooseCaseDetails() {
    let id = $("#mw_emp_sector :selected").attr('id');
    if (id === "1") {
//document.getElementById('no_mw').style.display = 'none';
//document.getElementById('no_mw').style.display = 'block';
        document.getElementById('mw').style.display = 'block';
        document.getElementById('mw_all_cat').style.display = 'block';
    } else if (id === "2") {
        document.getElementById('mw').style.display = 'block';
        document.getElementById('mw_all_cat').style.display = 'block';
    } else {
    }
}

function checkText(input) {
    if (!input) {
        return "NA";
    } else {
        return input;
    }
}


document.getElementById('report_btn').addEventListener('click', reportCase);
function reportCase(event) {
    event.preventDefault();
    var check = document.getElementById('info_check');
    //var pp_status = document.getElementById('mw_passport');
    if (check.checked) {
        addMigrantWorker();
    } else {
        alert("Agree to the Declaration Please");
    }

}

function checkText(input) {
    if (input !== null || input !== '') {
        return input;
    } else {
        return 'NA';
    }
}
function addMigrantWorker() {

    let sname = document.getElementById("mw_name_s").value;
    let fname = document.getElementById("mw_name_f").value;
    let mname = document.getElementById("mw_name_m").value;
    let name = sname + " " + fname + " " + mname;
    let pass = document.getElementById("mw_passport").value;
    let address = document.getElementById("mw_current_loca").value;
    let loca = document.getElementById("mw_address").value;
    let phone = document.getElementById("mw_whatsapp_no").value;
    //let email = document.getElementById("mw_whatsapp_no").value;
    let jobtype = document.getElementById("mw_job").value;
    let lco = $("#mw_lco :selected").attr('id');
    let fco = $("#mw_fco :selected").attr('id');
    let gender = $("#mw_gender :selected").attr('id');
    //let cty = $("#mw_country :selected").attr('id');
    let pic = document.getElementById("picture");

    var formdata = new FormData();
    formdata.append("nin", checkText("NA"));
    formdata.append("name", checkText(name));
    formdata.append("pass", checkText(pass));
    formdata.append("address", checkText(address));
    formdata.append("email", "NA");
    formdata.append("phone", checkText(phone));
    formdata.append("gender", gender);
    formdata.append("dob", "NA");
    formdata.append("jobtype", jobtype);
    formdata.append("lco", lco);
    formdata.append("fco", fco);
    formdata.append("loca", loca);
    formdata.append("lati", "NA");
    formdata.append("longi", "NA");
    formdata.append("cty", "UG");
    formdata.append("pic", pic.files[0]);

    if (valForm(sname, "Provide Name") === false || valForm(phone, "Incorrect Phone Number Format")
            || valForm(lco, "Choose Ugandan Company") === false || valForm(fco, "Choose Saudi Company") === false) {
        //empty fields
    } else {
        fetch(url + "create/co_guest_pic",
                {
                    body: formdata,
                    method: 'POST'
                }).then(function (response) {
            console.log('Response: ' + response.status);
            if (response.status === 200) {
                alert("You have been registered with the Embassy");
            } else {
                alert('Error Ocurred Please contact System Admin');
            }
            return response.text();
        }).catch(function (err) {
            console.log('ERROR: ' + err);
        });
    }
}

function getMWCheck() {
    var pass = document.getElementById('mw_passport').value;
    //let id = $(input).attr("id");
    try {
        $.ajax({
            url: url + "fetch/workers/" + pass,
            dataType: 'json',
            type: 'get',
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function () {
                //reset container
            },
            complete: function (data) {
                //upon completion
                //alert("Finished Loading");
            },
            success: function (data) {
                var e_data = '';
                try {
                    //$("#logs").empty();
                    let row = "";
                    let i = 1;
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.user_worker;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //console.log(jdata.userid);
                            document.getElementById('mw_userid').value = jdata.userid;
                            caseToEsafe();
                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.user_worker, function (index, value) {
                                alert("Error while loading user data");
                                //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                                //++i;
                            });
                        }
                    } else {
                        addMigrantWorker();
                        // alert("No Data to load");
                    }
                    //appending data
                    $("#logs").append(e_data);
                } catch (e) {
                    ShowError("Response Error", e, getMWDetails);
                }
            },
            error: function (d) {
                //$("#id").html()
                ShowError("Response Error");
                if (ajaxOptions === 'timeout') {
                    ShowError("Ajax Error", "Connection TimeOut");
                } else {
                    ShowError("Ajax Error", "Something went wrong!");
                }
            }});
    } catch (ex) {
        ShowError("Exception", ex);
    }
}


function getMWDetails(pass) {
//var pass = document.getElementById('mw_passport');
//let id = $(input).attr("id");
    try {
        $.ajax({
            url: url + "fetch/workers/" + pass,
            dataType: 'json',
            type: 'get',
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function () {
                //reset container
            },
            complete: function (data) {
                //upon completion
                //alert("Finished Loading");
            },
            success: function (data) {
                var e_data = '';
                try {
                    //$("#logs").empty();
                    let row = "";
                    let i = 1;
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.user_worker;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //console.log(jdata.userid);
                            document.getElementById('mw_userid').value = jdata.userid;
                            caseToEsafe();
                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.user_worker, function (index, value) {
                                alert("Error while loading user data");
                                //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                                //++i;
                            });
                        }
                    } else {
                        alert("No Data to load");
                    }
                    //appending data
                    $("#logs").append(e_data);
                } catch (e) {
                    ShowError("Response Error", e, getMWDetails);
                }
            },
            error: function (d) {
                //$("#id").html()
                ShowError("Response Error");
                if (ajaxOptions === 'timeout') {
                    ShowError("Ajax Error", "Connection TimeOut");
                } else {
                    ShowError("Ajax Error", "Something went wrong!");
                }
            }});
    } catch (ex) {
        ShowError("Exception", ex);
    }
}


function sendEmail() {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "sadamdoka@gmail.com",
        Password: "Sadam14doka92ahmed",
        To: 'esafealliance@gmail.com',
        From: "sadamdoka@gmail.com",
        Subject: "Sending Email using javascript",
        Body: "Well that was easy!!",
    })
            .then(function (message) {
                alert("mail sent successfully")
            });
}


function loadCity() {
    let id = $("#mw_country :selected").attr('id');
    //id = ""
    try {
        $.ajax({
//
            url: url + "fetch/city/0/" + id + "/null",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#mw_address").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {

                    //setSearch('mw_address');
                    $("#mw_address").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.city;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<option id="' + value.id + '" ">';
                            e_data += value.name;
                            e_data += '</option>';
                        } else {
                            $.each(data.city, function (index, value) {
                                e_data += '<option id="' + value.id + '" ">';
                                e_data += value.name;
                                e_data += '</option>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#mw_address").append("<option disabled selected hidden>Choose MW Address</option>");
                    $("#mw_address").append(e_data);
                    //$('mw_address').selectpicker('refresh');
                } catch (e) {
                    ShowError("Response Error", e, loadCity);
                }
            },
            error: function (d) {
                //$("#gallery_table").html('<tr><td colspan="5" align="center">Sorry an Expected error Occured.</td></tr>');
                if (ajaxOptions === 'timeout') {
                    alert("ajax Error", "Connection Timeout");
                } else {
                    alert("ajax Error", "Sorry! Something wrong, please try again");
                    //ShowError("ajax Error", thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
                }
                //console.log(d);
            }
        });
    } catch (ex) {
        alert("Exception", ex);
    }
}


function caseToEsafe() {
//Who Selecter
    let who = document.getElementById("who").value;
    //Who Details
    let who_name = document.getElementById("who_name").value;
    let who_tel = document.getElementById("who_tel").value;
    let who_email = document.getElementById("who_email").value;
    let who_city = document.getElementById("who_city").value;
    let source_info = document.getElementById("source_info").value;
    //Official
    let official_name = document.getElementById("official_name").value;
    let official_email = document.getElementById("official_email").value;
    let mw_sys_id = document.getElementById("mw_userid").value;
    let sname = document.getElementById("mw_name_s").value;
    let fname = document.getElementById("mw_name_f").value;
    let mname = document.getElementById("mw_name_m").value;
    let mw_name = sname + " " + fname + " " + mname;
    //let mw_name = document.getElementById("mw_name").value;
    let mw_phone = document.getElementById("mw_whatsapp_no").value;
    let mw_passport = document.getElementById("mw_passport").value;
    let mw_job = document.getElementById("mw_job").value;
    let mw_country = document.getElementById("mw_country").value;
    let mw_city_residence = document.getElementById("mw_address").value;
    let mw_email = "NA"; //document.getElementById("mw_email").value;


    let mw_lco_id = $("#mw_lco :selected").attr('id');
    let mw_lco = document.getElementById("mw_lco").value;
    let mw_lco_tel = $("#mw_lco :selected").attr('name');
    let mw_lco_email = $("#mw_lco :selected").attr('ma');

    let mw_fco_id = $("#mw_fco :selected").attr('id');
    let mw_fco = document.getElementById("mw_fco").value;
    let mw_fco_tel = $("#mw_fco :selected").attr('name');
    let mw_fco_email = $("#mw_fco :selected").attr('ma');

    let mw_emp_name = document.getElementById("mw_emp_name").value;
    let mw_emp_number = document.getElementById("mw_emp_number").value;
    let location = document.getElementById("mw_address").value;
    let mw_current_loca = document.getElementById("mw_current_loca").value;
    let mw_passport_status = document.getElementById("mw_passport_status").value;
    //Employment sector(DW or Else)
    let mw_emp_sector = document.getElementById("mw_emp_sector").value;
    //Compliant Details
    //let mw_complaint = document.getElementById("mw_complaint").value;
    //let case_cat = document.getElementById("case_cat").value;


    //let comp_narative = document.getElementById("comp_narative").value;
    let comp_help = document.getElementById("comp_help").value;
    //let comp_narative = document.getElementById("comp_narative").value;

    //Attachment
    //formData.append("pic", pic.files[0]);
    //let mw_pic = document.getElementById("mw_pic");//.value;
    //let mw_evidence = document.getElementById("mw_evidence");//.value;
    //let mw_other_doc = document.getElementById("mw_other_doc");//.value;
    //let mw_ev_video = document.getElementById("mw_ev_video");//.value;

    let mw_comp_category = document.getElementById("mw_comp_category").value;


    if (valForm(sname, "Provide Name") === false || valForm(mw_phone, "Incorrect Phone Number Format")
            || valForm(mw_lco, "Choose Ugandan Ccmpany") === false || valForm(mw_fco, "Choose Saudi Company") === false) {
        //empty fields
    } else {
        if (who === "1") {
            insertCase("4", "NA", "NA", "NA", "NA", "NA", "NA", mw_name, mw_phone, mw_email, mw_passport, mw_sys_id, mw_country, mw_city_residence, mw_passport_status, mw_emp_sector, mw_lco_id, mw_lco, mw_lco_tel, mw_lco_email, mw_fco_id, mw_fco, mw_fco_tel, mw_fco_email, mw_emp_name, mw_emp_number, location, mw_current_loca, comp_help, mw_comp_category);
        } else if (who === "4") {
            insertCase("4", "Government Agency", official_name, "NA", official_email, "NA", source_info, mw_name, mw_phone, mw_email, mw_passport, mw_sys_id, mw_country, mw_city_residence, mw_passport_status, mw_emp_sector, mw_lco_id, mw_lco, mw_lco_tel, mw_lco_email, mw_fco_id, mw_fco, mw_fco_tel, mw_fco_email, mw_emp_name, mw_emp_number, location, mw_current_loca, comp_help, mw_comp_category);
        } else {
            insertCase("4", who, who_name, who_tel, who_email, who_city, source_info, mw_name, mw_phone, mw_email, mw_passport, mw_sys_id, mw_country, mw_city_residence, mw_passport_status, mw_emp_sector, mw_lco_id, mw_lco, mw_lco_tel, mw_lco_email, mw_fco_id, mw_fco, mw_fco_tel, mw_fco_email, mw_emp_name, mw_emp_number, location, mw_current_loca, comp_help, mw_comp_category);
        }
    }
}

function insertCase(case_status, who_org, who_name, who_phone, who_email, who_address, source, mw_name, mw_phone, mw_email, mw_passport, mw_sys_id, mw_country, mw_city, mw_passport_status, emp_sector, local_agency_id, local_agency, local_phone, local_email, foreign_agency_id, foreign_agency, foreign_phone, foreign_email, emp_name, emp_number, location, mw_loca, mw_narative, comp_category) {
    var formdata = new FormData();
    formdata.append("case_status", checkText(case_status));
    formdata.append("who_org", checkText(who_org));
    formdata.append("who_name", checkText(who_name));
    formdata.append("who_phone", checkText(who_phone));
    formdata.append("who_email", checkText(who_email));
    formdata.append("who_address", checkText(who_address));
    formdata.append("source", checkText(source));
    formdata.append("mw_name", checkText(mw_name));
    formdata.append("mw_phone", checkText(mw_phone));
    formdata.append("mw_email", checkText(mw_email));
    formdata.append("mw_passport", checkText(mw_passport));
    formdata.append("mw_sys_id", checkText(mw_sys_id));
    formdata.append("mw_country", checkText(mw_country));
    formdata.append("mw_city", checkText(mw_city));
    formdata.append("mw_passport_status", checkText(mw_passport_status));
    formdata.append("emp_sector", checkText(emp_sector));
    formdata.append("local_agency_id", checkText(local_agency_id));
    formdata.append("local_agency", checkText(local_agency));
    formdata.append("local_phone", checkText(local_phone));
    formdata.append("local_email", checkText(local_email));
    formdata.append("foreign_agency_id", checkText(foreign_agency_id));
    formdata.append("foreign_agency", checkText(foreign_agency));
    formdata.append("foreign_phone", checkText(foreign_phone));
    formdata.append("foreign_email", checkText(foreign_email));
    formdata.append("emp_name", checkText(emp_name));
    formdata.append("emp_number", checkText(emp_number));
    formdata.append("location", checkText(location));
    formdata.append("mw_loca", checkText(mw_loca));
    formdata.append("mw_narative", checkText(mw_narative));
    formdata.append("comp_category", checkText(comp_category));
    fetch(url + "create/case_ticket_web",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);

        return response.text();
    }).then(function (data) {
        const obj = JSON.parse(data);
        if (obj.status === true) {
            loadOrgan_Officer(foreign_agency_id, mw_name, obj.error_msg, comp_category, mw_narative);
            //loadOfficer(foreign_agency_id, mw_name, obj.error_msg, emp_sector, mw_narative);
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        // console.log(obj.error_msg);
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}

function setPassport() {
    let pp = $("#status_pass :selected").attr('id');
    if (pp === '1') {
        loadOrgan('UG', 'mw_lco', "<option  disabled selected hidden >Choose Ugandan/Sending Recruitment Agency</option>");
        loadOrgan('SA', 'mw_fco', "<option  disabled selected hidden >Choose Saudi/Receiving Recruitment Agency</option>");
        //document.getElementById("mw_passport").disabled = true;
        document.getElementById("mw_passport").style.display = 'block';
        //document.getElementById("mw_passport").value = "Unknown";
        document.getElementById("lco_div").style.display = 'block';
        document.getElementById("fco_div").style.display = 'block';
    } else {
        //document.getElementById("mw_passport").disabled = false;
        document.getElementById("mw_passport").style.display = 'block';
        document.getElementById("auto_btn").style.display = 'block';
        document.getElementById("mw_passport").value = "";
        document.getElementById("lco_div").style.display = 'block';
        document.getElementById("fco_div").style.display = 'block';
    }
}



function setOrgan(input, elem) {
    try {
        $.ajax({
//
            url: url + "fetch/organ/0/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                // $("#prop_body").html('<tr><td colspan="5" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');

            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#model_mw_organ").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.organ;
                        if (!isJsonArray(jdata)) {
                            //console.log(jdata.id);
                            e_data += '<option id="' + jdata.organid + '" value="' + jdata.email + '" name="' + jdata.phone + '" ">';
                            e_data += jdata.names;
                            e_data += '</option>';
                        } else {
                            $.each(data.organ, function (index, value) {
                                //console.log(value.id);
                                e_data += '<option id="' + value.organid + '" value="' + value.email + '" name="' + value.phone + '" ">';
                                e_data += value.names;
                                e_data += '</option>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    //$("#" + elem).append(opt);
                    $("#" + elem).append(e_data);
                    //console.log(e_data);
                    //setSearch(elem);
                } catch (e) {
                    ShowError("Response Error", e, loadOrgan);
                }
            },
            error: function (d) {
                console.log(d);
                //$("#gallery_table").html('<tr><td colspan="5" align="center">Sorry an Expected error Occured.</td></tr>');
                if (ajaxOptions === 'timeout') {
                    alert("ajax Error", "Connection Timeout");
                } else {
                    alert("ajax Error", "Sorry! Something wrong, please try again");
                    //ShowError("ajax Error", thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
                }
                //console.log(d);
            }
        });
    } catch (ex) {
        alert("Exception", ex);
    }
}




function loadOrgan_Officer(input, name, caseticket, caseType, caseDetails) {
    //console.log('Loading Organ Officer');
    //console.log(input);
    try {
        $.ajax({
            //
            url: url + "fetch/organ/0/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                // $("#prop_body").html('<tr><td colspan="5" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');

            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    // $("#model_user_co").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.organ;
                        if (!isJsonArray(jdata)) {
                            //console.log(jdata);
                            loadOfficer(jdata.officer, name, caseticket, caseType, caseDetails);
                        } else {
                            $.each(data.organ, function (index, value) {
                                //console.log(value.id);
                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    //$("#model_user_co").append(e_data);
                } catch (e) {
                    ShowError("Response Error", e, loadOrgan_Officer);
                }
            },
            error: function (d) {
                //$("#gallery_table").html('<tr><td colspan="5" align="center">Sorry an Expected error Occured.</td></tr>');
                if (ajaxOptions === 'timeout') {
                    alert("ajax Error", "Connection Timeout");
                } else {
                    alert("ajax Error", "Sorry! Something wrong, please try again");
                    //ShowError("ajax Error", thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
                }
                //console.log(d);
            }
        });
    } catch (ex) {
        alert("Exception", ex);
    }
}



function loadOfficer(input, name, caseticket, caseType, caseDetails) {
    //console.log('Loading Officer');
    //console.log(input);
    // console.log(caseticket);
    try {
        $.ajax({
            //
            url: url + "fetch/user/0/" + input + "/null/",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                // $("#prop_body").html('<tr><td colspan="5" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');

            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    // $("#model_user_co").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.user;
                        if (!isJsonArray(jdata)) {
                            //console.log(jdata);
                            assignCase_Officer(caseticket, name, caseType, caseDetails, jdata.organ, "Embassy", jdata.resid, jdata.name);
                        } else {
                            $.each(data.user, function (index, value) {
                                //console.log(value.id);

                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    //$("#model_user_co").append(e_data);
                } catch (e) {
                    ShowError("Response Error", e, loadOfficer);
                }
            },
            error: function (d) {
                //$("#gallery_table").html('<tr><td colspan="5" align="center">Sorry an Expected error Occured.</td></tr>');
                if (ajaxOptions === 'timeout') {
                    alert("ajax Error", "Connection Timeout");
                } else {
                    alert("ajax Error", "Sorry! Something wrong, please try again");
                    //ShowError("ajax Error", thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
                }
                //console.log(d);
            }
        });
    } catch (ex) {
        alert("Exception", ex);
    }
}




function assignCase_Officer(caseticket, name, caseType, caseDetails, assigneeId, assignee, officerId, officer) {
    //console.log(caseType);

    let formData = new FormData();

    formData.append('caseticket', caseticket);
    formData.append('caseType', caseType);
    formData.append('caseDetails', caseDetails);
    formData.append('assigneeId', assigneeId);
    formData.append('assignee', assignee);
    formData.append('officerId', officerId);
    formData.append('officer', officer);
    formData.append('recommendation', "NA");
    formData.append('followUp', "NA");
    formData.append('remarks', "NA");

    fetch(url + "create/case_mgt",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        return response.text();
    }).then(function (data) {
        const obj = JSON.parse(data);
        if (obj.status === true) {
            Swal.fire({
                icon: 'info',
                title: 'Case Registered with Ticket: ' + caseticket,
                text: 'Migrant Worker :' + name,
                footer: '<a href="https://play.google.com/store/apps/details?id=com.esafeafrica.esafe" target="_blank">Click here to download App and Follow up case</a>'

            });
        } else {
            alert('Error Ocurred Please contact System Admin' + obj.error_msg);
        }
        // console.log(obj.error_msg);
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}

