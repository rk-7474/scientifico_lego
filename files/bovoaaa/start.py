# funzioni
from func2023_nuove import *

# programmi
from m1 import M1a, M1b
from m2 import M2 
from m3 import M3
from m4 import M4
from m5 import M5

missioni = [M1a, M1b, M2, M3, M4, M5]

############### MENU' ###############

missione = 0
exit = 0
run = False


while not exit:
    try: 
        hub.display.char(str(missione))

        if run:
            resetImu()
            missioni[missione]()   # avvia la missione
            if missione < 5:
                missione += 1
            else:
                missione = 0
            run = False

        elif Button.CENTER in hub.buttons.pressed():
            while Button.CENTER in hub.buttons.pressed():
                pass
            run = True
        
        # elif Button.BLUETOOTH in hub.buttons.pressed():
        #     while Button.BLUETOOTH in hub.buttons.pressed():
        #         pass
        #     exit = True

        elif Button.RIGHT in hub.buttons.pressed():
            missione = missione + 1 if missione < len(missioni)-1 else 0
            while Button.RIGHT in hub.buttons.pressed():
                pass

        elif Button.LEFT in hub.buttons.pressed():
            missione = missione - 1 if missione > 0 else missione
            while Button.LEFT in hub.buttons.pressed():
                pass

    except Exception as error:
        print(error)
    
