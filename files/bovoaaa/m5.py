from func2023_nuove import *


def M5():
    # avanti verso le rotaie
    trazDistMotor(33, 75, 1, 1)
    trazTime(100, 75, 0, 1)
    wait(500)

    # abbassa l'artiglio
    motorTop_SX.reset_angle()
    motorTop_SX.run_angle(1000, 250, Stop.BRAKE, True)

    # torna indetro
    trazDistMotor(16, -50, 0, 2)

    # gira e assicura il punto
    turnFunctP_old(70, -70, -40, 0.8)
    trazTime(900, 40, -25, 2)
