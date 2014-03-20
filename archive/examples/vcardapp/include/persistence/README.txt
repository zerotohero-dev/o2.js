This folder demonstrates the server-side "Persistence Tier".
It can be the file system (as in this example),  or a a relational database, 
or some cloud storage,  or a memory cache of some sort.

What "Persistence Tier" does is to abstract all those implementation details 
and provide a unified interface.

The "Business Tier" reads data from the "Persistence Tier", 
and executes business functions with them.

The "Business Tier" can also write data to the "Persistence Tier".
