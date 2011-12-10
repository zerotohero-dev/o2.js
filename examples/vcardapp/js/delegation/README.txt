The "Delegation Tier" is the layer between the application logic and the user interface.
When a user interaction (such as a click event) occurs, the "Delegation Tier" handles it
and directs it to a proper Controller on the "Behavior Tier", which then decides what to do.

The communication between the "Delegation Tier" and the "Behavior Tier" is one way.
That is to say, the "Delegation Tier" can send messages to the "Behavior Tier"; but
the "Behavior Tier" cannot send messages back to the "Delegation Tier".

The "Delegation Tier" cannot directly call the "Presentation Tier" or the "Communication Tier".
It chains this responsibility to the "Behavior Tier" via "event handlers".

The "Delegation Tier" can read data from the "Persistence Tier", but cannot write to it.
