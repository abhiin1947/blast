#pragma strict

// Game Variables

var lives: int;
var score: int;
var playing: int = 0;
var gameover: int = 0;


//Screen and World Variables

var sw : int;
var sh : int;
var wx0 : float;
var wy0 : float;
var wxw : float;
var wyh : float;

var blockEndWorld : float;

// Game Objects

var gameitem : GameObject;

// Game Variables

var minwaittime : float;
var maxwaittime : float;

//Style Variables

var spacefont : Font;
var fontcolor : Color;
var boxcolor : Color;

var style : GUIStyle;
var bstyle : GUIStyle;
var cstyle : GUIStyle;
var dstyle : GUIStyle;

function Start () {

		sw = Screen.width;
		sh = Screen.height;
		
		style = new GUIStyle();
		style.font = spacefont;
		style.fontSize = Screen.height / 720.0f * 72;
		style.normal.textColor = fontcolor;

		bstyle = new GUIStyle();
		bstyle.font = spacefont;
		bstyle.fontSize = Screen.height / 720.0f * 84;
		
		cstyle = new GUIStyle();
		cstyle.font = spacefont;
		cstyle.fontSize = Screen.height / 720.0f * 42;
		cstyle.normal.textColor = fontcolor;
		
		dstyle = new GUIStyle();
		dstyle.font = spacefont;
		dstyle.fontSize = Screen.height / 720.0f * 12;
		
		StartCoroutine("doUpdate");
		
		wx0 = Camera.main.ScreenToWorldPoint(Vector3 (0,0,blockEndWorld)).x;
		wxw = Camera.main.ScreenToWorldPoint(Vector3 (sw,sh,blockEndWorld)).x;
		wy0 = Camera.main.ScreenToWorldPoint(Vector3 (0,0,blockEndWorld)).y; 
		wyh = Camera.main.ScreenToWorldPoint(Vector3 (sw,sh,blockEndWorld)).y;
		
		
				
}



function Update()
{
	if (Input.touchCount > 0)
	{
		var ray = Camera.main.ScreenPointToRay (Input.GetTouch(0).position);
		var hit : RaycastHit;
		if (Physics.Raycast (ray, hit)) 
		{
			if(hit.collider.tag == "block")
			{
				Destroy(hit.transform.gameObject);
				if(playing == 1)
					addScore();
			} 
		}
	}
	/*if (Input.GetMouseButtonDown(0)) {
        var ray2 : Ray = Camera.main.ScreenPointToRay (Input.mousePosition);
        var hit2 : RaycastHit;
        if (Physics.Raycast (ray2, hit2)) {
            if(hit2.collider.tag == "block")
			{
				Destroy(hit2.transform.gameObject);
				if(playing == 1)
					addScore();
			}
        }
    }*/
}

function stopGame() {
	gameover = 1;
	playing = 0;
}

function addScore()
{
	score += 1;
}


var duration : float = 4.0;

function OnGUI() {
	if(gameover == 1) {
		
		if (PlayerPrefs.GetInt("highscore",-1) == -1 || PlayerPrefs.GetInt("highscore",-1) < score) {
			PlayerPrefs.SetInt("highscore",score);
		}
		
		//Score Text
		var scoretext =  "Your      Score   :    " + score.ToString();
		var scoreTextSize = style.CalcSize(new GUIContent(scoretext));
		
		GUI.Label (Rect (Screen.width / 2 - scoreTextSize.x / 2, Screen.height / 2 - scoreTextSize.y - (scoreTextSize.y/4), scoreTextSize.x, scoreTextSize.y), scoretext, style);
		
		//HighScore Text
		var hightext = "High      Score   :    " + PlayerPrefs.GetInt("highscore",0);
		var highTextSize = style.CalcSize(new GUIContent(hightext));
		
		GUI.Label (Rect (Screen.width / 2 - highTextSize.x / 2, Screen.height / 2, highTextSize.x, highTextSize.y), hightext, style);
		
		//Restart Button
		bstyle.normal.textColor = Color.Lerp(Color.red, Color.blue, Mathf.PingPong (Time.time, duration) / duration);
		//GUI.Box(Rect (Screen.width / 2 - 60, Screen.height / 2 + 65,style.CalcSize(new GUIContent("Restart     Game")).x + 10,55), "");
		
		var restarttext = "Restart     Game";
		var restartTextSize = bstyle.CalcSize(new GUIContent(restarttext));
		if (GUI.Button (Rect (Screen.width / 2 - restartTextSize.x / 2, Screen.height / 2 + (5*highTextSize.y/4), restartTextSize.x, restartTextSize.y), restarttext, bstyle)) {
			Application.LoadLevel(Application.loadedLevel);
		}
		
		//GUI.Box( , "");		
		
		//Credits Text
		var credittext = "Created      by      Abhinandan      Ramaprasath";
		var creditTextSize = cstyle.CalcSize(new GUIContent(credittext));
		
		GUI.Label (Rect (Screen.width / 2 - creditTextSize.x / 2, Screen.height - creditTextSize.y, creditTextSize.x, creditTextSize.y), credittext, cstyle);
	}
	
	else {
	
		var scoretext2 = "Score   :    " + score;
		var scoreTextSize2 = style.CalcSize(new GUIContent(scoretext2));
		GUI.Label (Rect (10, 10, scoreTextSize2.x, scoreTextSize2.y), scoretext2, style);
		
		
		var livestext = "Lives   :    " + lives;
		var liveTextSize = style.CalcSize(new GUIContent(livestext));
		GUI.Label (Rect (Screen.width - liveTextSize.x - 10, 10, liveTextSize.x, liveTextSize.y), livestext, style);
	}
}

function doUpdate () {
	yield WaitForSeconds(Random.Range(minwaittime, maxwaittime));
	if(playing == 1)
	{
		Instantiate(gameitem, Vector3(Random.Range(wx0,wxw),Random.Range(wy0,wyh),0f), Quaternion.identity);
		StartCoroutine("doUpdate");
	}
}