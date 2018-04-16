
# coding: utf-8
#!/usr/bin/env python

import sys,os
import subprocess,time
import datetime



with open(sys.argv[1], 'r') as f:

    for line in f:
        video = "https://www.youtube.com/watch?v=" + line
        commandeOmx = "omxplayer -b $(youtube-dl -g -f best "+video+")"
        os.system(commandeOmx)
        print("Loading next video!")

        #print(video)
        #Lancer la vidéo avec omxplayer
        #Attendre duration secondes pour lancer la suivante
        #Optionnel : si appuie sur Q quitter
