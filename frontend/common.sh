#!/bin/bash

checkerror()
{	
	if ! [ $? -eq 0 ]
	then
		echo "<error> "$1
		echo
		exit 1
	fi
} 