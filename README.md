Refactor logic to be more cyclical and resettable in entirety, ie Restart triggers the whole cascade in one main loop

Work out how to correctly capture and display catpured progressions
-- progression naming is corrected, but it seems to output each current set of progressions on every cell click, not only at correct time
-- either don't print until correct progrssion found
OR
-- create set of numbers and check if new progression exists already, if not than add and print

Currently, Reset resets the grid,  but not the number collection XX

Also, I want to experiment with higher count progressions (Potentially allowing any number, but that may be expensive)


Currently, further progressions can be sought after finding one, but there is no ouput of those prior findings, so probably a text display recording the numbers and the count between them s hould be added

Add in user input to select progression count x

Need to refactor. The current strip 'selectIntegersHolder" does not really add anything now, it's basically a small version of the grid.

Instead, we can switch to collecting the progressions as individual elements ie 2, 20, 40 etc 0 and on clicking one of those, the suitable
squares in the grid will be higlighted.