export default {
    VALID_MAZE: `###########
    S #   #   #
    # # # # # #
    #   #   # #
    ######### #
    # #       #
    # # #######
    # #   #   #
    # # # ### #
    #   #     F
    ###########`,
    SOLVED_MAZE: `###########
    S^#^^^#^^^#
    #^#^#^#^#^#
    #^^^#^^^#^#
    #########^#
    # #^^^^^^^#
    # #^#######
    # #^^^#   #
    # # #^### #
    #   #^^^^^F
    ###########`,
    INVALID_MAZE: `###########
    S #   #   #
    # # # # # #
    #   #   # #
    ######### #
    # #       #
    # # #######
    # #   #   #
    # # # ### #
    #   #     F
    ##########`,
    INVALID_MAZE_UNKNOWN_CHARACTER: 
    `####
     S FD`,
     INVALID_MAZE_START_MISSING: 
    `####
     # F#`,
     INVALID_MAZE_FINISH_MISSING: 
    `####
     S ##`,
     PATH_NOT_FOUND: 
    `####
     S #F`
}