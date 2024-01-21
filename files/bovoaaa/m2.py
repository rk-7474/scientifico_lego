from func2023_nuove import *

def M2():
    trazDistMotor(53, 60, 2, 2)
    motorTop_SX.run_angle(-1500, 250)
    trazDistMotor(14, 40, 2, 2)
    trazDistMotor(23, 60, 5, 2)
    trazDistMotor(2, -60, 0, 2)
    motorTop_SX.run_angle(1500, 250, Stop.BRAKE, True)
    trazDistMotor(3, 60, 0, 2)
    motorTop_DX.run_angle(1500, 75, Stop.BRAKE, True)
    turnFunctP_old(0, 40, 30, 0.8)
    trazDistMotor(33, 70, 30, 2)
    turnFunctP_old(40, 0, -30, 0.8)
    trazDistMotor(50, 85, -30, 2)

    ##11,80






