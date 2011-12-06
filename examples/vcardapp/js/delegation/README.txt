The delegation tier is the layer between the application logic and the user interface.
When a user interaction (such as a click event) occurs, the delegation tier handles it
and directs it to a proper object on the behavior tier, which then decides what to do.

The communication between the Delegation Tier and the Behavior Tier is one way.
That is to say, Delegation Tier can send messages to the Behavior Tier; but Behavior
Tier cannot send messages back to the Delegation Tier.

Delegation Tier cannot directly call the Presentation Tier or the Communication Tier.
It triggers the Behavior Tier via event handlers.

Delegation tier can read data from the persistence tier, but cannot write to it.
Delegation tier cannot directly call methods of the communication tier or the
presentation tier; it chains this responsibility to the behavior tier instead.

