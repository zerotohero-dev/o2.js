The "Behavior Tier" is the heart and brain of the client-side application.

It is responsible for:
	Reading data from the "Persistence Tier",
	Updating the "Presentation Tier" with the new data,
	Responding user-event-driven requests from the "Delegation Tier".

It reads data from and writes data to the "Persistence Tier".

It can call the methods of the "Communication Tier".
It also receives method calls from the "Communication Tier".

It can call the methods of the "Presentation Tier".
