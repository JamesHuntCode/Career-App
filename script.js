window.onload = function () {
  document.getElementById('list-of-all-jobs').style.display = "none"; //Element(s) to be revealed later.
  //Function that controls all event handlers.
  function main () {
    //All HTML button elements:
    var viewAllJobsButton = document.getElementById('button1');
    var searchForJobButton = document.getElementById('button2');
    var submitJobButton = document.getElementById('button3');

    viewAllJobsButton.onclick = function () { //Button in control of viewing all avaliable jobs:
      document.getElementById('list-of-all-jobs').style.display = "";
      var innerText = document.getElementById('refresh-button');
      if (innerText.innerHTML == "Reload!") { //User wants to refresh:
        refresh();
      } else { //User wants to load current avaliable jobs:
        document.getElementById('avaliable-jobs-header').innerHTML = "All current job openings:"
        innerText.innerHTML = "Reload!"; //Allow the user to refresh their job listings.
        displayAllJobs(); //Call function to display all jobs to the user.
      }
    };

    searchForJobButton.onclick = function () { //Button in control of search for jobs:
      document.getElementById('append-search-results-here').innerHTML = "";
      document.getElementById('append-similar-results-here').innerHTML = "<h3 class='nothing-found-small'>No other applicable search results found.</h3>";
      var searchData = getSearchData(); //Array containing searched job name and searched job location.
      var matches = checkForMatches(searchData[0], searchData[1]);
      document.getElementById('enter-job').value = "";
      document.getElementById('enter-location').value = ""; //Reset input text fields.
    };

    submitJobButton.onclick = function () { //Button in control of advertising jobs:
      var jobInformation = getJobData(); //Array containing information uploaded by user.
      var appendUserJobs = appendJobData(jobInformation[0], jobInformation[1], jobInformation[2]);
      addNewJobToArray(jobInformation[0], jobInformation[1], jobInformation[2]);
      document.getElementById('job-title').value = "";
      document.getElementById('job-location').value = "";
      document.getElementById('job-desc').value = ""; //Reset input text fields.
    };
  };
  main(); //Call main function.
  //Code that controls displaying all avaliable jobs to the user:
  var jobTitleArray = []; //Array to contain all individual job names.
  var jobLocationArray = []; //Array to contain all individual job locations.
  function displayAllJobs () {
    var jobTitles = document.getElementById('job-titles');
    var jobLocations = document.getElementById('job-locations');
    for (var i = 0; i < avaliableJobs.length; i++) { //Append all jobs to HTML document:
      jobTitleArray.push(avaliableJobs[i].jobTitle);
      jobLocationArray.push(avaliableJobs[i].jobLocation);
    };
    for (var j = 0; j < jobTitleArray.length; j++) {
      document.getElementById('append-job-titles-here').insertAdjacentHTML('beforeend', '<p>' + jobTitleArray[j] + '</p>');
    };
    for (var k = 0; k < jobLocationArray.length; k++) {
      document.getElementById('append-job-locations-here').insertAdjacentHTML('beforeend', '<p>' + jobLocationArray[k] + '</p>');
    };
    return [avaliableJobs.length, jobTitleArray.length, jobLocationArray.length];
  };
  function refresh (allLen, titleLen, locationLen) { //Function that will delete all loaded jobs and produce a refreshed list:
    var jobTitleArray = []; //Empty array.
    var jobLocationArray = []; //Empty array.
    document.getElementById('append-job-titles-here').innerHTML = "";
    document.getElementById('append-job-locations-here').innerHTML = "";
    for (var allLen = 0; allLen < avaliableJobs.length; allLen++) { //Append all jobs to HTML document:
      jobTitleArray.push(avaliableJobs[allLen].jobTitle);
      jobLocationArray.push(avaliableJobs[allLen].jobLocation);
    };
    for (var titleLen = 0; titleLen < jobTitleArray.length; titleLen++) {
      document.getElementById('append-job-titles-here').insertAdjacentHTML('beforeend', '<p>' + jobTitleArray[titleLen] + '</p>');
    };
    for (var locationLen = 0; locationLen < jobLocationArray.length; locationLen++) {
      document.getElementById('append-job-locations-here').insertAdjacentHTML('beforeend', '<p>' + jobLocationArray[locationLen] + '</p>');
    };
  };
  //Code that controls the job search function:
  var searchResults = document.getElementById('display-job-results');
  searchResults.style.height = "0px"; //Change this if a search match has been found.
  var avaliableJobs = [];
  //a few job objects containing all info surrounding the avaliable jobs:
  var programmer = {
    jobTitle: "SOFTWARE DEVELOPER",
    jobLocation: "PLYMOUTH",
    jobDescription: "Front end JavaScript developer for a small tech company called weCode4U."
  };
  var teacher = {
    jobTitle: "TEACHER",
    jobLocation: "LONDON",
    jobDescription: "Primary school teacher at a small school in London called Ridgeway."
  };
  var doctor = {
    jobTitle: "DOCTOR",
    jobLocation: "CORNWALL",
    jobDescription: "General GP to treat common cases of illness at the Liskeard Surgery."
  };
  var nurse = {
    jobTitle: "NURSE",
    jobLocation: "PLYMOUTH",
    jobDescription: "Nurse to aid post-surgery patients at Derriford Hospital in Plymouth."
  };
  var taxiDriver = {
    jobTitle: "TAXI DRIVER",
    jobLocation: "BRISTOL",
    jobDescription: "Experienced taxi driver needed for a local taxi company based in Bristol"
  };
  var lawyer = {
    jobTitle: "LAWYER",
    jobLocation: "CORNWALL",
    jobDescription: "Employment lawyer needed to look over business contracts for our firm."
  };
  avaliableJobs.push(programmer, teacher, doctor, nurse, taxiDriver, lawyer); //Insert job objects into array of all avaliable jobs.
  function getSearchData () { //Function to retrieve the job name and location that the user has input.
    var userInputJobName = document.getElementById('enter-job').value;
    var userInputJobLocation = document.getElementById('enter-location').value;
    var jobNameSearch = userInputJobName.toUpperCase();
    var jobLocationSearch = userInputJobLocation.toUpperCase();
    if (jobNameSearch.length <= 1 || jobLocationSearch <= 1) { //Check to make sure that the user has made a valid input:
      alert("Please make a valid job and location search.");
    } else {  //If they have return array of search data:
      return [jobNameSearch, jobLocationSearch];
    }
  };
  function checkForMatches (name, location) { //Function to check user search against objects within the avialiable jobs array:
    for (var i = 0; i < avaliableJobs.length; i++) {
      if (avaliableJobs[i].jobTitle === name && avaliableJobs[i].jobLocation === location) { //Check for a match on both name AND location:
        searchResults.style.height = "";
        var appendMatches = document.getElementById('append-search-results-here');
        appendMatches.innerHTML = "<div class='search-result'><p>" + avaliableJobs[i].jobTitle + "</p><p>" + avaliableJobs[i].jobLocation + "</p><p>" + avaliableJobs[i].jobDescription + "</p></div>";
      } else if (avaliableJobs[i].jobTitle === name || avaliableJobs[i].jobLocation === location) { //Check for name OR location matches:
        searchResults.style.height = "";
        var appendSimilarMatches = document.getElementById('append-similar-results-here');
        appendSimilarMatches.innerHTML = "<div class='search-result'><p>" + avaliableJobs[i].jobTitle + "</p><p>" + avaliableJobs[i].jobLocation + "</p><p>" + avaliableJobs[i].jobDescription + "</p></div>";
      }
    }
  };
  //Code that controls the upload job function:
  function getJobData () { //Function that retrieves all job data:
    var jobNameInput = document.getElementById('job-title').value;
    var jobLocationInput = document.getElementById('job-location').value;
    var jobDescriptionInput = document.getElementById('job-desc').value;
    var jobName = jobNameInput.toUpperCase();
    var jobLocation = jobLocationInput.toUpperCase();
    if (jobName.length < 3 || jobLocation.length < 3 || jobDescriptionInput.length < 3) { //User has not made a valid input.
      alert("Please make a valid job title, location and description input.");
    } else {
      return [jobName, jobLocation, jobDescriptionInput]; //Return array with the information the user has submitted.
    }
  };
  function appendJobData (name, location, description) { //Function that will append all job data to submitted jobs section:
    var container = document.getElementById('append-jobs-here');
    document.getElementById('no-ad-text').style.display = "none";
    container.insertAdjacentHTML('beforeend', "<div class='appended-job'><p>" + name + "</p><p>" + location + "</p><p>" + description + "</p></div>");
  };
  //Function that adds user submitted jobs into the array of jobs that we can search for:
  function addNewJobToArray (name, location, description) {
    function newJob (jobTitle, jobLocation, jobDescription) {
      this.jobTitle = jobTitle;
      this.jobLocation = jobLocation;
      this.jobDescription = jobDescription;
    };
    var userUploadedJob = new newJob (name, location, description);
    avaliableJobs.push(userUploadedJob);
  };
};
