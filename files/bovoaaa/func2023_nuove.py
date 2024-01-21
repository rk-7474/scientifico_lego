from pybricks.hubs import PrimeHub
from pybricks.pupdevices import Motor, ColorSensor, UltrasonicSensor, ForceSensor
from pybricks.parameters import Button, Color, Direction, Port, Side, Stop
from pybricks.robotics import DriveBase
from pybricks.tools import wait, StopWatch


# hub
hub = PrimeHub()
timer = StopWatch()
resetImu = lambda: hub.imu.reset_heading(0)
hub.system.set_stop_button(Button.BLUETOOTH)

# sensori
ultrasonic = UltrasonicSensor(Port.F) # porta sensore distanza 'F'
luce = ColorSensor(Port.B) # porta sensore luce 'B'

# motori
motorMove_SX = Motor(Port.D) # motore muovimento sinistro
motorMove_DX = Motor(Port.E, Direction.COUNTERCLOCKWISE) # motore muovimento destro
motorTop_SX = Motor(Port.C) # motore medio sinistro
motorTop_DX = Motor(Port.A) # motore medio destro
motor_pair = DriveBase(motorMove_DX, motorMove_SX, wheel_diameter = 6, axle_track = 8.1) # movimento con entrambi i motori

# costanti
IMU_ERROR = 1.15
MIN_POWER = 25
INCREMENT = 0.05


######################################################################################################
#          Le potenze sono invertite tra i motori perchè i cavi dei motori sono invertiti            #
######################################################################################################

############ FUNZIONI ############

def motoriMain(power, targetAngle, kp):
    motorMove_DX.dc(correction("L", power, targetAngle, kp))
    motorMove_SX.dc(correction("R", power, targetAngle, kp))


## !!! add on/off softStart and softEnd !!! ##

def softStart(power):
    """softStart with coroutine.

        The function returns a dynamic value that increases
        over time. It can be used in functions for motors
        with softStart enabled.

        Parameters
        ----------
        power (int): Maximum power
    """
    softStart_power = 0
    finalPower = abs(power)
    while softStart_power < finalPower:
        softStart_power += INCREMENT
        yield softStart_power if (power > 0) else -softStart_power


def softEnd(power):
    """softStart with coroutine.

        The function returns a dynamic value that increases
        over time. It can be used in functions for motors
        with softStart enabled.

        Parameters
        ----------
        power (int): Maximum power
    """

    softEnd_power = power
    while softEnd_power > MIN_POWER:
        softEnd_power -= INCREMENT
        yield softEnd_power

def correction(motor, power, targetAngle, kp):
    """Direction correction function.

        Used within the motor motion function,
        returns a power that corrects the direction of the robot.

        Parameters
        ----------
        motor (string): motor ("L" | "R")
        power (int): Power of the motor (-100, 100)
        targetAngle (int): Angle of the robot (0, 360)
        kp (int): constant of correction (based on the power but 2 is the most used)
    """

    gradiNow = hub.imu.heading()
    error = targetAngle - gradiNow
    p = kp*(error - IMU_ERROR)

    if motor == "L":
        correctedPower = (abs(power) + p) if power > 0 else -(abs(power) - p)
    elif motor == "R":
        correctedPower = (abs(power) -p) if power > 0 else -(abs(power) + p)

    return correctedPower

def stopMotorPair():
    """Function to stop both motors"""
    motorMove_DX.brake()
    motorMove_SX.brake()

counter = 0
def checkExit():
    global counter
    counter += 1
    if Button.BLUETOOTH in hub.buttons.pressed():
        stopMotorPair()
        wait(100)
        return True
    

def trazTime(time, power, targetAngle, kp): # timer -> ms | power -> POTENZA (%) NON mm al secondo | targetAngle -> angolo che deve mantenere il robot
    """Function to move the motor with a porportional correction based on time

        Parameters
        ----------
        time -> ms (int): runtime of the function (ms)
        power -> % (int): Power of the motor (-100, 100)
        targetAngle -> ° (int): Angle of the robot (0, 360)
        kp (int): constant of correction (based on the power but 2 is the most used)

    """
    power = softStart(power)

    final_power = 0

    timer.reset()
    while timer.time() <= time:
        if checkExit(): break

        try:
            final_power = next(power)
        except StopIteration:
            pass
        
        motoriMain(final_power, targetAngle, kp)
    stopMotorPair()

def trazLight(reflection, power, targetAngle, kp):
    """Function to move the motor with a porportional correction based on the light

        Parameters
        ----------
        reflection -> % (int): Reflection detected by the light sensor (0, 100)
        power -> % (int): Power of the motor (-100, 100, %)
        targetAngle -> ° (int): Angle of the robot (0, 360)
        kp (int): constant of correction (based on the power but 2 is the most used)

    """
    power = softStart(power)
    final_power = 0
    while luce.reflection() <= reflection:
        if checkExit(): break

        try:
            final_power = next(power)
        except StopIteration:
            pass

        motoriMain(final_power, targetAngle, kp)
            
    stopMotorPair()

def trazDistMotor(distance, power, targetAngle, kp):
    """Function to move the motor with a porportional correction based on the distance detected by the motor's encoder

        Parameters
        ----------
        distance -> cm (int): Distance detected by the motor's encoder
        power -> % (int): Power of the motor (-100, 100)
        targetAngle -> ° (int): Angle of the robot (0, 360)
        kp (int): constant of correction (based on the power but 2 is the most used)

    """
    
    motor_pair.reset()

    power = softStart(power)

    final_power = 0 
    while abs(motor_pair.distance()) <= abs(distance):
        if checkExit(): break

        try:
            final_power = next(power)
        except StopIteration:
            pass

        motoriMain(final_power, targetAngle, kp)

    stopMotorPair()

def trazDistSensUlt(distance, power, targetAngle, kp):
    """Function to move the motor with a porportional correction based on the distance detected by the ultrasonic sensor

        Parameters
        ----------
        distance -> mm (int): Distance detected by the ultrasonic sensor
        power -> % (int): Power of the motor (-100, 100)
        targetAngle -> ° (int): Angle of the robot (0, 360)
        kp (int): constant of correction (based on the power but 2 is the most used)

    """

    if (power > 0):
        power = softStart(power)

        final_power = 0
     
        while(ultrasonic.distance() <= distance):
            if checkExit(): break

            try:
                final_power = next(power)
            except StopIteration:
                pass

            motoriMain(final_power, targetAngle, kp)

    else:
        power = softStart(power)

        final_power = 0
        while(ultrasonic.distance() >= distance):
            if checkExit(): break

            try:
                final_power = next(power)
            except StopIteration:
                pass

            motoriMain(final_power, targetAngle, kp)

    stopMotorPair()

# DA AGGIORNARE CON LE NUOVE FUNZIONI
# rotazione sull'asse

def turnFunctP(powerL, powerR, targetAngle, kp):

    currentAngle = hub.imu.heading()
    
    diff = abs(currentAngle - targetAngle)

    softPowerL = softEnd(powerL)
    softPowerR = softEnd(powerR)

    # definisci la soglia di errore di giroscopio
    gyroThreshold = 0

    while (currentAngle <= targetAngle) if currentAngle <= targetAngle else (currentAngle >= targetAngle):
        if checkExit(): break
        
        currentAngle = hub.imu.heading()
        error = abs(currentAngle - targetAngle)

        try:
            final_powerL = next(softPowerL)
            final_powerR = next(softPowerR)
        except StopIteration:
            pass

        motorMove_SX.dc(final_powerL * max(kp, error/diff))
        motorMove_DX.dc(final_powerR * max(kp, error/diff))

        if error < gyroThreshold: #con valore ass--> +-threshold
            break

    # ferma i motori
    stopMotorPair()

def lineTimeP(leftValue, rightValue, time, power, kp): # nero (sx) bianco (dx)

    medium = (leftValue+rightValue)/2.0 # valore a metà
    color = luce.reflection() # or .reflection ambient

    timer.reset()
    while timer.time() <= time:
        color = luce.reflection()
        direction = leftValue < rightValue
        kColor = (kp*(medium-color ))

        motorMove_DX.dc(power+kColor if direction else power-kColor)
        motorMove_SX.dc(power-kColor if direction else power+kColor)

    stopMotorPair()


# FUNZIONI VECCHIE NON UTILIZZATE

def trazTime_old(time, power, targetAngle, kp): # timer -> ms / power -> POTENZA NON mm al secondo / angle -> gradi al secondo
    if power > 0:
        traz_error = 0
        traz_cycles = 0

        timer.reset()
        while timer.time() <= time:
            if checkExit(): break

            gradiNow = hub.imu.heading()
            error = targetAngle - gradiNow

            # correzione
            powerL = power + kp*(error - IMU_ERROR)
            powerR = power - kp*(error - IMU_ERROR)
            motorMove_DX.dc(powerL)
            motorMove_SX.dc(powerR)

            # debug
            traz_error += error
            traz_cycles += 1
            print("L = ", powerL, "     R = ", powerR, "      errore = ", error,  end = "\r")

            # controllo
            if Button.CENTER in hub.buttons.pressed():
                stopMotorPair()
                wait(200)

    if power < 0:
        traz_error = 0
        traz_cycles = 0

        timer.reset()
        while timer.time() <= time:
            if checkExit(): break
    
            gradiNow = hub.imu.heading()
            error = targetAngle - gradiNow

            # correzione
            powerL = -power + (-kp)*(error - IMU_ERROR)
            powerR = -power - (-kp)*(error - IMU_ERROR)
            motorMove_DX.dc(-powerL)
            motorMove_SX.dc(-powerR)

            # debug
            traz_error += error
            traz_cycles += 1
            print("L = ", powerL, "     R = ", powerR, "      errore = ", error,  end = "\r")

            # controllo
            if Button.CENTER in hub.buttons.pressed():
                stopMotorPair()
                wait(200)

    # ferma i motori
    stopMotorPair()
    return traz_cycles, traz_error

def trazLight_old(reflection, power, targetAngle, kp):
    if power > 0:
        raz_error = 0
        traz_cycles = 0

        while luce.reflection() <= reflection:
            gradiNow = hub.imu.heading()
            error = targetAngle - gradiNow

            # correzione
            powerL = power + kp*(error - IMU_ERROR)
            powerR = power - kp*(error - IMU_ERROR)
            motorMove_DX.dc(powerL)
            motorMove_SX.dc(powerR)

            # debug
            traz_error += error
            traz_cycles += 1
            print("L = ", powerL, "     R = ", powerR, "      errore = ", error,  end = "\r")

    if power < 0:
        raz_error = 0
        traz_cycles = 0

        while luce.reflection() <= reflection:
            gradiNow = hub.imu.heading()
            error = targetAngle - gradiNow

            # correzione
            powerL = -power + (-kp)*(error - IMU_ERROR)
            powerR = -power - (-kp)*(error - IMU_ERROR)
            motorMove_DX.dc(-powerL)
            motorMove_SX.dc(-powerR)

            # debug
            traz_error += error
            traz_cycles += 1
            print("L = ", powerL, "     R = ", powerR, "      errore = ", error,  end = "\r")

    # ferma i motori
    stopMotorPair()
    return

def trazDistMotor_old(distance, power, targetAngle, kp):
    if power > 0:
        raz_error = 0
        traz_cycles = 0

        motor_pair.reset()
        while motor_pair.distance() <= distance:
            gradiNow = hub.imu.heading()
            error = targetAngle - gradiNow

            # correzione
            powerL = power + kp*(error - IMU_ERROR)
            powerR = power - kp*(error - IMU_ERROR)
            motorMove_DX.dc(powerL)
            motorMove_SX.dc(powerR)

            # debug
            # traz_error += error
            # traz_cycles += 1
            # print("L = ", powerL, "     R = ", powerR, "      errore = ", error,  end = "\r")

    if power < 0:
        raz_error = 0
        traz_cycles = 0

        motor_pair.reset()
        while abs(motor_pair.distance()) <= distance:
            gradiNow = hub.imu.heading()
            error = targetAngle - gradiNow

            # correzione
            powerL = -power + (-kp)*(error - IMU_ERROR)
            powerR = -power - (-kp)*(error - IMU_ERROR)
            motorMove_DX.dc(-powerL)
            motorMove_SX.dc(-powerR)

            # debug
            # traz_error += error
            # traz_cycles += 1
            # print("L = ", powerL, "     R = ", powerR, "      errore = ", error,  end = "\r")

    # ferma i motori
    stopMotorPair()
    return

def trazDistSens_old(distance, power, targetAngle, kp):
    if power > 0:
        raz_error = 0
        traz_cycles = 0

        while ultrasonic.distance() <= distance:
            gradiNow = hub.imu.heading()
            error = targetAngle - gradiNow

            # correzione
            powerL = power + kp*(error - IMU_ERROR)
            powerR = power - kp*(error - IMU_ERROR)
            motorMove_DX.dc(powerL)
            motorMove_SX.dc(powerR)

            # debug
            traz_error += error
            traz_cycles += 1
            print("L = ", powerL, "     R = ", powerR, "      errore = ", error,  end = "\r")

    if power < 0:
        raz_error = 0
        traz_cycles = 0

        motor_pair.reset()
        while ultrasonic.distance() <= distance:
            gradiNow = hub.imu.heading()
            error = targetAngle - gradiNow

            # correzione
            powerL = -power + (-kp)*(error - IMU_ERROR)
            powerR = -power - (-kp)*(error - IMU_ERROR)
            motorMove_DX.dc(-powerL)
            motorMove_SX.dc(-powerR)

            # debug
            traz_error += error
            traz_cycles += 1
            print("L = ", powerL, "     R = ", powerR, "      errore = ", error,  end = "\r")

    # ferma i motori
    stopMotorPair()
    return

def lineDistMotor_old(leftValue, rightValue, distance, power, kp): # nero (sx) bianco (dx)

    medium = (leftValue+rightValue)/2.0 # valore a metà
    color = luce.reflection() # or .reflection ambient

    while motor_pair.distance() <= distance:
        color = luce.reflection()
        if leftValue < rightValue:
            motorMove_DX.dc(power+(kp*(medium-color )))
            motorMove_SX.dc(power-(kp*(medium-color )))

        if rightValue < leftValue:
            motorMove_DX.dc(power-(kp*(medium-color )))
            motorMove_SX.dc(power+(kp*(medium-color )))

    # ferma i motori
    stopMotorPair()

def trazLight_old(reflection, power, targetAngle, kp):
    if power > 0:
        raz_error = 0
        traz_cycles = 0

        while luce.reflection() <= reflection:
            gradiNow = hub.imu.heading()
            error = targetAngle - gradiNow

            # correzione
            powerL = power + kp*(error - IMU_ERROR)
            powerR = power - kp*(error - IMU_ERROR)
            motorMove_DX.dc(powerL)
            motorMove_SX.dc(powerR)

            # debug
            traz_error += error
            traz_cycles += 1
            print("L = ", powerL, "     R = ", powerR, "      errore = ", error,  end = "\r")

    if power < 0:
        raz_error = 0
        traz_cycles = 0

        while luce.reflection() <= reflection:
            gradiNow = hub.imu.heading()
            error = targetAngle - gradiNow

            # correzione
            powerL = -power + (-kp)*(error - IMU_ERROR)
            powerR = -power - (-kp)*(error - IMU_ERROR)
            motorMove_DX.dc(-powerL)
            motorMove_SX.dc(-powerR)

            # debug
            traz_error += error
            traz_cycles += 1
            print("L = ", powerL, "     R = ", powerR, "      errore = ", error,  end = "\r")

    # ferma i motori
    stopMotorPair()
    return
    

def turnFunctP_old(powerL, powerR, targetAngle, kp):
    currentAngle = hub.imu.heading()
    
    diff = abs(currentAngle - targetAngle)

    # definisci la soglia di errore di giroscopio
    gyroThreshold = 0

    # angoli positivi
    if(currentAngle <= targetAngle):      # controllo casistica   if [abs(a) < abs(f)]->  1)[]true (verso destra) 2)![](verso sinistra)  a:actual f:final
        while currentAngle <= targetAngle:
            if checkExit(): break

            currentAngle = hub.imu.heading()
            error = abs(currentAngle - targetAngle)

            #motor_pair.move()
            motorMove_SX.dc(powerL* max(kp, error/diff))
            motorMove_DX.dc(powerR* max(kp, error/diff))

            # se l'errore è minore della soglia, il robot è orientato nella giusta direzione
            if error < gyroThreshold: #con valore ass--> +-threshold
                break

    # angoli negativi
    else :
        while targetAngle <= currentAngle:
            if checkExit(): break

            currentAngle = hub.imu.heading()
            error = abs(currentAngle - targetAngle)

            #motor_pair.move()
            motorMove_SX.dc(powerL* max(kp, error/diff))
            motorMove_DX.dc(powerR* max(kp, error/diff))

            # se l'errore è minore della soglia, il robot è orientato nella giusta direzione
            if error < gyroThreshold: #con valore ass--> +-threshold
                break

    # ferma i motori
    stopMotorPair()


def lineTimeP_old(leftValue, rightValue, time, power, kp): # nero (sx) bianco (dx)

    medium = (leftValue+rightValue)/2.0 # valore a metà
    color = luce.reflection() # or .reflection ambient

    timer.reset()
    while timer.time() <= time:
        color = luce.reflection()
        if leftValue < rightValue:
            motorMove_DX.dc(power+(kp*(medium-color )))
            motorMove_SX.dc(power-(kp*(medium-color )))

        if rightValue < leftValue:
            motorMove_DX.dc(power-(kp*(medium-color )))
            motorMove_SX.dc(power+(kp*(medium-color )))

    # ferma i motori
    stopMotorPair()


def debug(txt):
    righe = txt.split('\n')
 
    for riga in righe:
        if riga == "":
            continue
        while not (Button.CENTER in hub.buttons.pressed()):
            wait(100)
        while (Button.CENTER in hub.buttons.pressed()):
            wait(100)
        eval(riga)

def waitPress():
    while not (Button.CENTER in hub.buttons.pressed()):
        wait(100)
    while (Button.CENTER in hub.buttons.pressed()):
        wait(100)


# TODO: creare una funzione per girare su stessi con condizione temporale

# motorMove_SX.dc(-50)
# wait(750)