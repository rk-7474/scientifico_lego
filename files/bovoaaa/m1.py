from func2023_nuove import *

def M1a():
    #1 parte 6 secondi
    trazDistMotor(30, 40, 0, 2)
    trazDistMotor(28, 40, 1, 2)
    trazTime(250, 40, 1, 2)
    motorTop_SX.run_angle(400, 360, Stop.BRAKE, False)
    trazDistMotor(54, -85, -1, 2)

    # ######################

    while not (Button.CENTER in hub.buttons.pressed()): #DA TESTARE
        wait(100)

    ######################

    #2 parte 11 secondi
    resetImu()
    M1b()

def M1b():
    motorTop_DX.run_angle(200, 340, Stop.BRAKE, False)
    trazDistMotor(40, 60, 3, 2)
    motorTop_DX.run_angle(-400, 300, Stop.BRAKE, True)
    trazDistMotor(15, 40, 3, 2)
    motorTop_SX.run_angle(-1000, 1800, Stop.BRAKE, True)
    trazDistMotor(4, -40, 0, 2)
    turnFunctP_old(0, 30, 10, 0.8)
    trazDistMotor(50, -80, 10, 2)
