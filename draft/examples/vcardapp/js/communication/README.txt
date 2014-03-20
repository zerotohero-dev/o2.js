The "Communication Tier" is where the client sends messages to, and responses from
external APIs are received from. These requests can be an AJAX or JSONP request, a websocket connection, an iframe proxy, a flash proxy, an ActiveX or a HTC component... The main responsibility of this tier is to decouple the proxy used from the other sides of the application,
so that it can be easily replaced with alternate implementations without a major effect on the 
remaining parts of the code.

The "Communication Tier" can send messages to (as callbacks) and receive messages from (as  API requests) the "Behavior Tier".

The "Communication Tier" cannot talk directly to the "Presentation Tier", it should delegate presentational changes to the "Behavior Tier" instead.

The "Communication Tier" can read data from the "Persistence Tier", but it cannot write data to it.
