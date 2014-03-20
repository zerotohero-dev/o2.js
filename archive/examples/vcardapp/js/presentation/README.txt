The presentation tier is where the DOM interaction takes place.
Any rendering, repainting, reflowing, notificaiton, prompt, alert happens in this tier.

The Presentation Tier methods is only called from the Behavior Tier.
The Presentation Tier cannot call the Communication Tier directly.

The Presentation Tier can read data from the Persistence Tier,
but it cannot write data to it.
