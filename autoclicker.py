import pyautogui as pa
import keyboard
import pytesseract as pyt
from PIL import ImageGrab
from time import time, sleep

lastClick = time()


# Minimum time between clicks allowed
click_cd = .1

cap_first = (2675, 300)
image_cord = (3790, 130, 3875, 155)  # x1, y1, x2, y2
cap_second = (3735, 180)
cap_third = (3750, 220)

BoS_loot_btn = (3755, 170)


def preventMulti(f):
    def wrapper(*args, **kwargs):
        global lastClick
        if time() - lastClick >= click_cd:
            result = f(*args, **kwargs)
            lastClick = time()
            return result
        else:
            return None
    return wrapper


@preventMulti
def autoclick(e):
    pa.click(clicks=50, interval=0.005)


@preventMulti
def capBypass(e):
    mouse_pos = pa.position()
    pa.click(*cap_first, clicks=1, button='primary')

    # Cap math expression
    img = ImageGrab.grab(bbox=image_cord)
    # Resize for better OCR result
    img = img.resize((1000, 200))

    # Get OCR result
    ocr_result = pyt.image_to_string(
        img, config='digits --psm 10 --oem 3 -c tessedit_char_whitelist=0123456789=?+').strip()
    print(f'The OCR detected: {ocr_result}')

    # If OCR returns empty
    if not ocr_result or '+' not in ocr_result:
        return
    expression_arr = ocr_result.split('+')
    # Split
    expression_arr[1] = expression_arr[1].split('=', 1)[0]
    print(f'After isolating terms the array is: {expression_arr}')

    # Math
    result = int(expression_arr[0]) + int(expression_arr[1])
    print(f'After doing math the final result is {result}')

    # Accept btn from cap
    pa.click(*cap_second, clicks=1, button='primary')
    # Input resulting
    keyboard.write(str(result), delay=.1)
    pa.click(*cap_third)
    pa.moveTo(*mouse_pos)


@preventMulti
def lootBoS(e):
    print("LootBoS Called")
    mousePos = pa.position()
    pa.click(*BoS_loot_btn)
    pa.moveTo(*mousePos)


@preventMulti
def autoRightClick(e):
    pa.click(clicks=100, interval=0.01, button='right')


@preventMulti
def clickUntil(e):
    while True:
        if keyboard.is_pressed('q'):
            break
        pa.click()
        sleep(1.2)


keyboard.on_press_key('f1', autoclick)
keyboard.on_press_key('f2', lootBoS)
keyboard.on_press_key('f3', capBypass)
keyboard.on_press_key('f4', autoRightClick)
keyboard.on_press_key('f5', clickUntil)


keyboard.wait()
