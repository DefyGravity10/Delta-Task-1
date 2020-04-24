document.getElementById("incorrect").style.display="none";                  //Turned off display for unneccesary elements to begin with
document.getElementById("finished").style.display="none";
document.getElementById("stats").style.display="none";
document.getElementById("leaderboard").style.display="none";

var score=0,k=0;                                                            //Declaring and initializing required variables
var arra=[];
var diffi;
var minutes=0,seconds=0;
var myvar;

var sound=new Audio();                                                      //Creating audio elements for sound effects in the game
sound.src="sound.mp3";
var cheer=new Audio();
cheer.src="cheer.mp3";
var lose=new Audio();
lose.src="youlose.mp3";

/*var crr=[9.00,9.00,9.00,9.00,9.00];
var drr=[9.00,9.00,9.00,9.00,9.00];
var err=[9.00,9.00,9.00,9.00,9.00];
localStorage.setItem("besta",JSON.stringify(crr));
localStorage.setItem("besti",JSON.stringify(drr));
localStorage.setItem("bestl",JSON.stringify(err));
*/

function generate_table(x)                                                  //Function to generate table or grid based on the selected difficulty represented by var x
{
  document.getElementById("home").style.display="none";
  document.getElementById("stats").style.display="block";
  diffi=x;
  var ar=[];
  for(var dub=0;dub<x**2;dub++)
  {
    ar[dub]=dub+1;
  }
    // Reference for master element...All created elements are appended to this
    var body = document.getElementById("table");
  
    // Creates a <table> element and a <tbody> element
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
  
    // Creating all cells for the table
    for (var i = 0; i < x; i++) {
      // creates a table row
      var row = document.createElement("tr");
  
      for (var j = 0; j < x; j++) {
        // Creating a <td> element and a text node, making the text
        // node the contents of <td>, and appending <td> at
        // the end of the table row
        var cell = document.createElement("td");
        cell.id=i+""+j;                                                      //Giving unique id's to each cell
        cell.addEventListener("click",rectify);                              //Calls function rectify when a cell isclicked on
        cell.addEventListener("click",timing);                               //Calls function timing when a cell is clicked on
        var cellText = document.createTextNode(ran(ar,x));                   //Text in each cell equated with return value of randon function
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
  
      // Adding the row to the end of the table body
      tblBody.appendChild(row);
    }
  
    // Appending the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // Appends <table> into <div> with id 'table'
    body.appendChild(tbl);
    // sets the border attribute of tbl to 2;
    tbl.setAttribute("border", "2");


  var y,r,g,b;                                                               //Necessary variables declared to hold rgb values

  for(var v=0;v<x;v++)                                                       //The nested loops to add background colour to the cells with varying shades
  {
    for(var vs=0;vs<x;vs++)
    {
      y=Number(document.getElementById(v+""+vs).innerHTML);
      r=150-2*y;
      g=250-2*y;
      b=150-2*y;
      document.getElementById(v+""+vs).style.backgroundColor="rgb("+r+","+g+","+b+")";
    }
  }
 }

  function ran(a,b)                                                          //Function to generate unique random values and return them so as to set them to cells 
  {
    while(1)
    {
      var n;
      var index= Math.floor((b**2)*Math.random());
      if(a[index]!=0)
      {
        n=a[index];
        a[index]=0;
        return n;
      }
    }  

  }

  function rectify()                                                          //Function to specify action swhen clicked on a cell
  {
    sound.play();                                                             //Plays a sound everytime a cell is clicked on
    arra[k]=Number(this.innerHTML);
    if(score<diffi**2)                                                        //First Half of the game
    {
      if(score==0&&this.innerHTML==1)                                         //conditions for incrementation of score
      {
        score++;
      }
      else if(this.innerHTML-arra[k-1]==1&&k!=0)
      {
        score++;
      }
      else                                                                    //Calls function incorrect when a wrong move is commited in the game
      {
        incorrect();
      }  
      k++;  
      this.innerHTML=Number(diffi**2)+Number(this.innerHTML);                 //The no. on each cell is replaced by another when clicked on(during the first half)
      
    }    
    else                                                                      //Second half
    {
      if(this.innerHTML-arra[k-1]==1&&k!=0)
      {
        score++;
        if(score==(diffi**2)*2){                                              //calls function finished() when maximum score is reached
          finished();
      }
      }  
      else
      {
        incorrect();
      }
        k++;  
      this.style.display="none";                                              //Tiles or cells dissapear when clicked on 
    } 
    document.getElementById("scores").innerHTML=score; 
  }


  function finished()                                                         //function to display certain messages when the game is successfully completed
  {
    cheer.play();                                                             //Sound effect signifying victory
    document.getElementById("finished").style.display="block";
    document.getElementById("score2").innerHTML=score;
    stop_timing();                                                            //Stops the ticking clock
    document.getElementById("table").innerHTML="";
  }

  function incorrect()                                                        //Function to display certain messages when an incorrect move is made in the  game
  {
    lose.play();                                                              //Sound effect signifying loss
    document.getElementById("incorrect").style.display="block";
    document.getElementById("score").innerHTML=score;
    stop_timing();                                                            //Time is stopped
    document.getElementById("table").innerHTML="";
  }

  function timing()                                                           //Function to set a delay of one second between ticks in the clock
  {
    if(arra[k-1]==1)
    {
    myvar=setInterval(ttiming, 1000);
  }
  }

  function ttiming(){                                                         //Function runs every 1 second and makes up the intricacies of terms-'seconds' and'minutes'
    seconds++;
    if(seconds==60)
    {
        seconds=0;
        minutes++;
    }
    if(seconds<10)
    {
    document.getElementById("seconds").innerHTML=0+""+seconds;
    }
    else{
      document.getElementById("seconds").innerHTML=seconds;
    }
    document.getElementById("minutes").innerHTML=0+""+minutes;
    if(minutes==9)                                                             //Maximum allowed time to play(Come on nine minutes to click cells while counting is greatly generous)
    {
        clearInterval(myvar);                                                  //Clears the intervals or rather stops time!!
        incorrect();                                                           //Ends the game displaying score
    }       
    }
  function stop_timing()                                                       //Function to stop timer during special or required conditions
  {
    clearInterval(myvar);
  }

  function startagain()                                                        //Function to restart game when the previous game ended or luckily won
  {
    cheer.pause();                                                             //Pauses victory sounds in case the 'gamer' is in a hurry to start a new game
    document.getElementById("finished").style.display="none";                  //Including this, the next few lines deal with resetting everything
    document.getElementById("incorrect").style.display="none";
    document.getElementById("home").style.display="block";
    document.getElementById("stats").style.display="none";
    seconds=0;
    minutes=0;
    score=0;
    document.getElementById("seconds").innerHTML=seconds;
    document.getElementById("minutes").innerHTML=0+""+minutes;
    document.getElementById("scores").innerHTML=score;
    document.getElementById("leaderboard").style.display="none";
  }

  var checkrr=[];                                                             //Empty Array utilized to retrieve data from local storage
  function generate_leaderboard()                                             //Function to display the leaderboard
  {
    document.getElementById("finished").style.display="none";
    document.getElementById("leaderboard").style.display="block";
    if(diffi==3)                                                              //If-else clauses differentiate the board with accordance to the difficulty selected or by now 'tackled'
    {
      checkrr=JSON.parse(localStorage.getItem("besta"));                      //Retrieving data
      checkrr.push(minutes+"."+seconds);                                      //Next few lines deal with manipulating the data
      checkrr.sort();
      checkrr.pop();
      localStorage.setItem("besta",JSON.stringify(checkrr));                  //Saving it back again
    }
    else if(diffi==4)
    {
      checkrr=JSON.parse(localStorage.getItem("besti"));
      checkrr.push(minutes+"."+seconds);
      checkrr.sort();
      checkrr.pop();
      localStorage.setItem("besti",JSON.stringify(checkrr));
    }
    else
    {
      checkrr=JSON.parse(localStorage.getItem("bestl"));
      checkrr.push(minutes+"."+seconds);
      checkrr.sort();
      checkrr.pop();
      localStorage.setItem("bestl",JSON.stringify(checkrr));
    }   
    for(var ll=0;ll<5;ll++)                                                   //This deals with display of leaderboard
    {
      document.getElementById("00"+ll).innerHTML=checkrr[ll];
    }
  }