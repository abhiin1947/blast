#pragma strict

var cam : GameObject;
var score : int;

function Start()
{
	score = 0;
	transform.position = Camera.main.ScreenToWorldPoint(new Vector3(-1 * Screen.width + 70,Screen.height * 2,10));
	updateScore();
}

function addScore()
{
	score += 1;
	updateScore();
}

function updateScore()
{
	GetComponent(typeof(TextMesh)).text = "Score: " + score.ToString() + " Lives: " + GameObject.FindWithTag("MainCamera").GetComponent(cameraScript).lives;
}