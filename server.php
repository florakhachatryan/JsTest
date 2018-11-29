<?php

$tree =
[
    [
        'id' => 1 , 'label' => 'a' ,
        'children' => [
            [
                'id' => 2 , 'label' => 'b' ,
                'children' => [
                    ['id' => 5 , 'label' => 'c'],
                    ['id' => 6 , 'label' => 'd'],
                    ['id' => 7 , 'label' => 'd'],
                ],
            ],
            ['id' => 3 , 'label' => 'c'],
            [
                'id' => 4 , 'label' => 'd',
                'children' => [
                    ['id' => 8 , 'label' => 'h'],
                    ['id' => 9 , 'label' => 'i'],
                ],
            ],
        ],
    ],
];

echo(json_encode($tree));
