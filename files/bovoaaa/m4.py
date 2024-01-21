from func2023_nuove import *

########### 23 secondi da sistemare il fiore ###########

def M4():
    # Movimento iniziale in direzione delle missioni
    trazDistMotor(27, -60, 0, 2)
    turnFunctP_old(0, -50, -58, 0.7)

    motorTop_SX.run_angle(1500, 400, Stop.BRAKE, False)
    trazDistMotor(89, -60, -53, 2)

    turnFunctP_old(0, -50, -85, 0.7)

    trazDistMotor(2, -50, -87, 2)
    trazDistMotor(22, 50, -87, 2)

    motorTop_SX.run_angle(1500, 2200, Stop.BRAKE)
    motorTop_SX.run_angle(-1500, 800, Stop.BRAKE)

    motorTop_SX.run_angle(-1500, 1800, Stop.BRAKE, False)

    trazDistMotor(16, -50, -95, 2)

    trazTime(700, 50, -89, 2)

    turnFunctP_old(-60, 0, -34, 0.7)

    trazLight(55, -30, -25, 2)

    trazDistMotor(11, -30, -25, 2) 

    # motorMove_SX.dc(-50)

    turnFunctP_old(0, 50, 7, 0.8)

    trazDistMotor(18, -40, 7, 0.8)

    turnFunctP_old(0, -80, -10, 3.5)

    wait(150)

    turnFunctP_old(0, 40, 0, 0.8)

    trazDistMotor(12, -40, 10, 0.8)

    turnFunctP_old(0, -40, -45, 0.8)

    trazDistMotor(7, -40, -45, 0.8)

    turnFunctP_old(0, -40, -55, 0.8)

    motorTop_DX.run_angle(-1500, 75)

    trazDistMotor(15, 70, -60, 2)

    turnFunctP_old(0, 40, 0, 0.8)

    trazDistMotor(50, 70, 0, 2)

    turnFunctP_old(50, 0, -45, 1.8)

    trazDistMotor(50, 70, -45, 2)

    trazDistMotor(50, 70, -30, 2)
