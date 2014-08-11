#pragma strict

function Start () {
	rigidbody.velocity = new Vector3(0,0,-3);
	
	rigidbody.AddTorque(Vector3(Random.Range(1f,5f), Random.Range(1f,5f), Random.Range(1f,5f)));
}



function Update () {
	var camerascript = GameObject.FindWithTag("MainCamera").GetComponent(cameraScript);
	if(transform.position.z < -10)
	{
		if (camerascript.playing == 1)
		{
			camerascript.lives -= 1;
			if ( camerascript.lives == 0 )
				camerascript.stopGame();
		}
		Destroy(gameObject);
	}
}