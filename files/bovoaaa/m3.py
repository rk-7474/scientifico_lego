from func2023_nuove import *

#21 secondi

def M3():
    SCHIACCI = 2 
    trazDistMotor(41, 70, 0, 2)

    trazDistSensUlt(180, -60, 0, 2)

    turnFunctP_old(0, 50, 90, 0.8)
    trazDistMotor(16, 60, 90, 2)
    turnFunctP_old(0, -40, 40, 0.8)
    trazDistMotor(31, 40, 40, 2)
    turnFunctP_old(-40, 0, 90, 0.8)
    trazDistMotor(12, -60, 90, 2)
    turnFunctP_old(60, 0, -3, 0.8)
    motorTop_SX.run_angle(-600, 300, Stop.BRAKE, False)
    trazDistMotor(31, 60, -3, 2)
    motorTop_SX.run_angle(400, 280, Stop.BRAKE, True)
    # trazDistMotor(3, 35, -3, 2)
    turnFunctP_old(60, 0, -22, 0.8)

    for i in range(SCHIACCI):
        trazDistMotor(4, 50, -22, 2)
        trazDistMotor(3, -50, -22, 2)
        wait(300)
    motorTop_DX.run_angle(-900, 200, Stop.BRAKE, True)
    wait(1000)
    motorTop_DX.run_angle(480, 200, Stop.BRAKE, True)
    turnFunctP_old(-35, 0, 0, 2)
    trazDistMotor(30, -90, 0, 2)
    turnFunctP_old(-35, 0, 30, 2)
    trazDistMotor(40, -90, 30, 2)
    turnFunctP_old(70, 0, -90, 2)










