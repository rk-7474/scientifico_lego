#!/bin/bash

gnome-termina  -- "bash -c 'client && npx vite'"
gnome-terminal -- "bash -c 'cd server && npx nodemon'"
